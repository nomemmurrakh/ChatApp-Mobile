import { useTheme } from "@/theme";
import { PlatformPressable } from "@react-navigation/elements";
import { StyleProp, Text, TextStyle, ViewStyle } from "react-native";

type LinkText = {
  text: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function LinkText({
  text,
  onPress,
  style,
  textStyle,
}: LinkText) {
  const { typography, colors } = useTheme();
  return (
    <PlatformPressable
      android_ripple={{ color: colors.accent }}
      onPress={onPress}
      style={style}
    >
      <Text style={[typography.caption, { color: colors.accent }, textStyle]}>
        {text}
      </Text>
    </PlatformPressable>
  );
}
