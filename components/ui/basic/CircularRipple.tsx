import { useTheme } from "@/theme";
import React from "react";
import {
    Platform,
    Pressable,
    PressableProps,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";

interface CircularRippleProps extends Omit<PressableProps, "style"> {
  children: React.ReactNode;
  onPress?: () => void;
  rippleColor?: string;
  size?: number;
  rippleRadius?: number;
  style?: StyleProp<ViewStyle>;
  pressableStyle?: ViewStyle;
  disabled?: boolean;
  iosOpacity?: number;
}

const CircularRipple: React.FC<CircularRippleProps> = ({
  children,
  onPress,
  rippleColor,
  size = 24,
  rippleRadius,
  style,
  pressableStyle,
  disabled = false,
  iosOpacity = 0.5,
  ...otherProps
}) => {
  const calculatedRippleRadius: number = rippleRadius || size / 2;
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: "hidden", // Critical for fixing Android borderless ripple issue
          backgroundColor: "transparent",
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        android_ripple={{
          color: rippleColor ? rippleColor : colors.accent,
          borderless: true, // Works with overflow: 'hidden' wrapper
          radius: calculatedRippleRadius,
        }}
        style={({ pressed }: { pressed: boolean }) => [
          {
            width: "100%",
            height: "100%",
            borderRadius: size / 2,
            alignItems: "center",
            justifyContent: "center",
            // iOS opacity effect when pressed
            opacity: pressed && Platform.OS === "ios" ? iosOpacity : 1,
          },
          pressableStyle,
        ]}
        {...otherProps}
      >
        {children}
      </Pressable>
    </View>
  );
};

export default CircularRipple;
