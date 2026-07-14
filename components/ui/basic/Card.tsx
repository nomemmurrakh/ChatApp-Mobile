import { useTheme } from "@/theme";
import {
  Platform,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export type CardProps = Omit<PressableProps, "style"> & {
  cardStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function Card({
  children,
  cardStyle,
  containerStyle,
  ...rest
}: CardProps) {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable
        android_ripple={{
          color: colors.glass,
          borderless: true,
        }}
        style={({ pressed }) => [
          styles.card,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            opacity: Platform.OS === "ios" && pressed ? 0.5 : 1,
          },
          cardStyle,
        ]}
        {...rest}
      >
        {children}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    borderRadius: 24,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
  },
});
