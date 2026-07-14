import { useTheme } from "@/theme";
import { ReactNode, useState } from "react";
import {
  NativeSyntheticEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type TextFieldProps = Omit<TextInputProps, "style" | "onBlur" | "onFocus"> & {
  label?: string;
  left?: ReactNode;
  right?: ReactNode;
  outerContainerStyle?: StyleProp<ViewStyle>;
  inputContainerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  labelStyle?: StyleProp<TextStyle>;
  onFocused?: (isFocused: boolean) => void;
  onBlur?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  onFocus?:
    | ((e: NativeSyntheticEvent<TextInputFocusEventData>) => void)
    | undefined;
  error?: string;
  errorStyle?: StyleProp<TextStyle>;
};

export default function TextField({
  label,
  left,
  right,
  outerContainerStyle,
  inputContainerStyle,
  inputStyle,
  labelStyle,
  onFocused,
  onFocus,
  onBlur,
  error,
  errorStyle,
  ...rest
}: TextFieldProps) {
  const { colors, typography } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[outerContainerStyle]}>
      {label && (
        <Text
          style={[
            typography.caption,
            {
              marginBottom: 8,
              color: colors.textSecondary,
            },
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
      <View
        style={[
          styles.fieldContainer,
          {
            borderColor: focused ? colors.text : colors.border,
          },
          inputContainerStyle,
        ]}
      >
        {left && <View style={styles.icon}>{left}</View>}
        <TextInput
          style={[styles.textinput, { color: colors.text }, inputStyle]}
          placeholderTextColor={colors.textSecondary}
          onFocus={(e) => {
            setFocused(true);
            onFocused?.(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            onFocused?.(false);
            onBlur?.(e);
          }}
          cursorColor={colors.primary}
          selectionColor={colors.secondary}
          {...rest}
        />
        {right && <View style={styles.icon}>{right}</View>}
      </View>
      {error && error !== "" && (
        <Text
          style={[
            typography.caption,
            {
              marginTop: 8,
              color: colors.error,
            },
            errorStyle,
          ]}
        >
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  fieldContainer: {
    borderWidth: 0.8,
    borderRadius: 12,
    maxWidth: 300,
    maxHeight: 400,
    minHeight: 56,
    paddingHorizontal: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 8,
    fontFamily: "Inter",
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
  },
});
