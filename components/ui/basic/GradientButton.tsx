import { useTheme } from "@/theme";
import React, { ReactNode, useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import AnimatedGradientTransition from "../../AnimatedGradientTransition";

interface GradientButtonProps {
  title: string;
  onPress: () => void;
  loading?: boolean;
  colors?: string[];
  style?: ViewStyle;
  textStyle?: TextStyle;
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  right?: ReactNode;
}

const GradientButton: React.FC<GradientButtonProps> = ({
  title,
  onPress,
  loading = false,
  colors = ["#2dd4bf", "#9d4edd"],
  style,
  textStyle,
  buttonStyle,
  disabled = false,
  right,
}) => {
  const { colors: themeColors, typography } = useTheme();
  const [currentColors, setCurrentColors] = React.useState(colors);
  const intervalRef = useRef<number | null>(null);
  const disabledChangeRef = useRef(false);
  const scale = useSharedValue(1);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const createShiftedColors = (step: number) => {
    const [color1, color2] = colors;

    const patterns = [
      [color1, color2], // Step 0
      [color2, color2], // Step 1
      [color2, color1], // Step 2
      [color1, color1], // Step 3 (then back to 0)
    ];

    return patterns[step % 4];
  };

  useEffect(() => {
    if (loading) {
      let step = 0;

      const updateColors = () => {
        const newColors = createShiftedColors(step);
        setCurrentColors(newColors);
        step++;
      };

      // Start immediately
      updateColors();

      intervalRef.current = setInterval(updateColors, 500);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      setCurrentColors(colors);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, colors]);

  useEffect(() => {
    if (disabled) {
      if (!disabledChangeRef.current) {
        const colors = ["#9BA1A6", "#9BA1A6"] as string[];
        setCurrentColors(colors);
        disabledChangeRef.current = true;
      }
    } else {
      setCurrentColors(colors);
    }
  }, [disabled, colors]);

  return (
    <Animated.View style={animatedStyles}>
      <TouchableOpacity
        disabled={disabled || loading}
        style={[
          {
            borderRadius: 16,
            overflow: "hidden",
          },
          !disabled && {
            boxShadow: "0px 8px 24px rgba(75, 85, 255, 0.4)",
          },
          style,
        ]}
        activeOpacity={1}
        onPressIn={() => {
          scale.value = withSpring(0.9);
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
          onPress();
        }}
      >
        <AnimatedGradientTransition
          colors={currentColors}
          style={[styles.button, buttonStyle]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          animation={{
            duration: 500,
            easing: Easing.linear,
          }}
        >
          {loading && <ActivityIndicator size={24} color={"white"} />}
          {!loading && (
            <View style={styles.row}>
              <Text
                style={[
                  typography.button,
                  {
                    color: themeColors.text,
                  },
                  textStyle,
                ]}
              >
                {title}
              </Text>
              {right && <View style={styles.icon}>{right}</View>}
            </View>
          )}
        </AnimatedGradientTransition>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default GradientButton;

const styles = StyleSheet.create({
  button: {
    minHeight: 56,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  icon: {
    marginStart: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
