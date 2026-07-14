import { useTheme } from "@/theme";
import { detectAutofill } from "@/utils";
import { useKeyboard } from "@react-native-community/hooks";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

type SingleFieldOTPBoxProps = {
  value: string;
  onChange: (value: string) => void;
  readonly?: boolean;
  onComplete?: (otp: string) => void;
};

const SingleFieldOTPBox = forwardRef<TextInput, SingleFieldOTPBoxProps>(
  ({ value, onChange, readonly, onComplete }, ref) => {
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
    const [cursorVisible, setCursorVisible] = useState(true);
    // Track which positions have been filled vs empty (for visual display)
    const [digitPositions, setDigitPositions] = useState<boolean[]>([
      false,
      false,
      false,
      false,
    ]);
    const inputRef = useRef<TextInput>(null);
    const cursorBlinkInterval = useRef<number | null>(null);
    const previousValue = useRef(value);

    const { keyboardShown } = useKeyboard();

    // Convert value to display array based on digitPositions
    const getDigitsFromValue = (): string[] => {
      const result = ["", "", "", ""];
      const chars = value.split("");

      // Fill positions based on digitPositions array
      let valueIndex = 0;
      for (let i = 0; i < 4 && valueIndex < chars.length; i++) {
        if (digitPositions[i]) {
          result[i] = chars[valueIndex] || "";
          valueIndex++;
        }
      }

      return result;
    };

    const digits = getDigitsFromValue();

    // Update digitPositions when value changes
    useEffect(() => {
      const isAutofill = detectAutofill(value, previousValue.current);

      if (isAutofill) {
        // For autofill, set positions sequentially from the start
        const newPositions = [false, false, false, false];
        for (let i = 0; i < Math.min(value.length, 4); i++) {
          newPositions[i] = true;
        }
        setDigitPositions(newPositions);

        // Set focus to end of input
        if (value.length < 4) {
          setFocusedIndex(value.length);
        } else {
          // Complete, check if all positions filled
          if (newPositions.every((pos) => pos)) {
            onComplete?.(value);
            setFocusedIndex(null);
            inputRef.current?.blur();
          }
        }
      }
      // For manual edits, digitPositions are already updated in handleChangeText

      previousValue.current = value;
    }, [value, onComplete]);

    useEffect(() => {
      const isFieldFocused = inputRef.current?.isFocused();
      if (!keyboardShown && isFieldFocused) {
        inputRef.current?.blur();
        setFocusedIndex(null);
      }
    }, [keyboardShown]);

    // Cursor blinking effect
    useEffect(() => {
      if (focusedIndex !== null && !readonly) {
        cursorBlinkInterval.current = setInterval(() => {
          setCursorVisible((prev) => !prev);
        }, 530);
      } else {
        if (cursorBlinkInterval.current) {
          clearInterval(cursorBlinkInterval.current);
          cursorBlinkInterval.current = null;
        }
        setCursorVisible(true);
      }

      return () => {
        if (cursorBlinkInterval.current) {
          clearInterval(cursorBlinkInterval.current);
        }
      };
    }, [focusedIndex, readonly]);

    const rebuildValueFromPositions = (
      newPositions: boolean[],
      newDigits: string[]
    ): string => {
      let result = "";
      for (let i = 0; i < 4; i++) {
        if (newPositions[i] && newDigits[i]) {
          result += newDigits[i];
        }
      }
      return result;
    };

    const handleChangeText = (text: string) => {
      const numericText = text.replace(/[^0-9]/g, "").slice(0, 4);
      const currentLength = numericText.length;
      const previousLength = previousValue.current.length;

      // Let useEffect handle autofill detection
      // Here we only handle the case where it's definitely manual input
      const isDefinitelyManual =
        Math.abs(currentLength - previousLength) <= 1 && focusedIndex !== null;

      if (isDefinitelyManual) {
        // Handle manual editing
        if (currentLength > previousLength) {
          // Adding a digit
          const newDigit = numericText[numericText.length - 1];
          const targetIndex =
            focusedIndex !== null ? focusedIndex : currentLength - 1;

          if (targetIndex < 4) {
            const newDigits = [...digits];
            const newPositions = [...digitPositions];

            newDigits[targetIndex] = newDigit;
            newPositions[targetIndex] = true;

            const newValue = rebuildValueFromPositions(newPositions, newDigits);
            setDigitPositions(newPositions);
            onChange(newValue);

            // Move to next empty position or complete
            const nextEmptyIndex = newPositions.findIndex(
              (filled, idx) => idx > targetIndex && !filled
            );
            if (nextEmptyIndex !== -1) {
              setFocusedIndex(nextEmptyIndex);
            } else if (newPositions.every((filled) => filled)) {
              // All positions filled
              onComplete?.(newValue);
              inputRef.current?.blur();
              setFocusedIndex(null);
            } else {
              // Stay at current position + 1
              setFocusedIndex(Math.min(targetIndex + 1, 3));
            }
          }
        } else if (currentLength < previousLength) {
          // Removing a digit
          const deleteIndex =
            focusedIndex !== null ? focusedIndex : Math.max(0, currentLength);

          if (
            deleteIndex >= 0 &&
            deleteIndex < 4 &&
            digitPositions[deleteIndex]
          ) {
            const newPositions = [...digitPositions];
            newPositions[deleteIndex] = false;

            const newDigits = [...digits];
            newDigits[deleteIndex] = "";

            const newValue = rebuildValueFromPositions(newPositions, newDigits);
            setDigitPositions(newPositions);
            onChange(newValue);

            // Keep cursor at the same position
            setFocusedIndex(deleteIndex);
          }
        }
      } else {
        // Likely autofill or external change - let useEffect handle it
        onChange(numericText);
      }
    };

    const handleFocus = () => {
      // Empty
    };

    const handleBlur = () => {
      setFocusedIndex(null);
    };

    const handleBoxPress = (index: number) => {
      if (!readonly) {
        inputRef.current?.focus();
        setFocusedIndex(index);
        // Position cursor in hidden input based on how many digits come before this position
        const cursorPos = digitPositions
          .slice(0, index)
          .filter((filled) => filled).length;
        setTimeout(() => {
          inputRef.current?.setNativeProps({
            selection: { start: cursorPos, end: cursorPos },
          });
        }, 0);
      }
    };

    const isDigit = (key: any) => /^[0-9]$/.test(key);

    const handleKeyPress = (event: any) => {
      const { key } = event.nativeEvent;

      if (isDigit(key) && focusedIndex !== null) {
        event.preventDefault();

        const targetIndex = focusedIndex;

        if (targetIndex >= 0 && targetIndex < 4) {
          if (digitPositions[targetIndex]) {
            const newDigits = [...digits];
            newDigits[targetIndex] = key;

            const newValue = rebuildValueFromPositions(
              digitPositions,
              newDigits
            );
            setDigitPositions(digitPositions);
            onChange(newValue);

            // Stay at same position
            setFocusedIndex(targetIndex);
          }
        }
      } else if (key === "Backspace" && focusedIndex !== null) {
        event.preventDefault();

        const targetIndex = focusedIndex;

        if (targetIndex >= 0 && targetIndex < 4) {
          if (digitPositions[targetIndex]) {
            // Delete digit at focused position
            const newPositions = [...digitPositions];
            newPositions[targetIndex] = false;

            const newDigits = [...digits];
            newDigits[targetIndex] = "";

            const newValue = rebuildValueFromPositions(newPositions, newDigits);
            setDigitPositions(newPositions);
            onChange(newValue);

            // Stay at same position
            setFocusedIndex(targetIndex);
          } else if (targetIndex > 0) {
            // Move back to previous filled position and delete
            const prevFilledIndex = digitPositions
              .slice(0, targetIndex)
              .lastIndexOf(true);
            if (prevFilledIndex !== -1) {
              const newPositions = [...digitPositions];
              newPositions[prevFilledIndex] = false;

              const newDigits = [...digits];
              newDigits[prevFilledIndex] = "";

              const newValue = rebuildValueFromPositions(
                newPositions,
                newDigits
              );
              setDigitPositions(newPositions);
              onChange(newValue);

              setFocusedIndex(prevFilledIndex);
            }
          }
        }
      }
    };

    // Create display digits with proper spacing
    const displayDigits = digits.map((digit) => digit || " ");

    const { colors } = useTheme();

    return (
      <View style={styles.container}>
        {/* Hidden TextInput for handling input */}
        <TextInput
          ref={ref || inputRef}
          value={value}
          onChangeText={handleChangeText}
          onKeyPress={handleKeyPress}
          onFocus={handleFocus}
          onBlur={handleBlur}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="sms-otp"
          maxLength={4}
          style={styles.hiddenInput}
          editable={!readonly}
          cursorColor="transparent"
        />

        {/* Visual OTP Boxes */}
        <View style={styles.otpContainer}>
          {displayDigits.map((digit, index) => (
            <Pressable
              key={index}
              onPress={() => handleBoxPress(index)}
              style={[
                styles.otpBox,
                { borderColor: colors.text },
                readonly ? styles.readOnlyBox : styles.activeBox,
                focusedIndex === index && !readonly && styles.focusedBox,
                digit !== " " && styles.filledBox,
              ]}
            >
              <View style={styles.digitContainer}>
                {digit !== " " && (
                  <View style={styles.digitText}>
                    <TextInput
                      value={digit}
                      editable={false}
                      style={styles.digitDisplay}
                    />
                  </View>
                )}
                {focusedIndex === index && !readonly && cursorVisible && (
                  <View
                    style={[styles.cursor, { backgroundColor: colors.primary }]}
                  />
                )}
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  hiddenInput: {
    position: "absolute",
    left: -9999,
    opacity: 0,
    height: 1,
    width: 1,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  otpBox: {
    borderWidth: 0.5,
    borderRadius: 12,
    height: 64,
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  activeBox: {
    borderColor: "gray",
  },
  readOnlyBox: {
    backgroundColor: "transparent",
    borderColor: "white",
  },
  focusedBox: {
    borderColor: "white",
  },
  filledBox: {
    borderColor: "white",
  },
  digitContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  digitText: {
    justifyContent: "center",
    alignItems: "center",
  },
  digitDisplay: {
    fontSize: 20,
    textAlign: "center",
    color: "white",
    fontFamily: "Inter"
  },
  cursor: {
    position: "absolute",
    width: 2,
    height: 24,
    opacity: 1,
  },
});

export default SingleFieldOTPBox;
