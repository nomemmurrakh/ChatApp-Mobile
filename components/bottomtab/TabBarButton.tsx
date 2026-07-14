import { useTheme } from "@/theme";
import * as React from "react";
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
};

export default function TabBarButton({ children, onPress }: Props) {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <View style={styles.overlay}>
        <Pressable
          android_ripple={{
            color: colors.glass,
            borderless: true,
          }}
          style={({ pressed }) => {
            return [
              styles.pressable,
              {
                opacity: Platform.OS === "ios" && pressed ? 0.5 : 1,
              },
            ];
          }}
          onPress={onPress}
        >
          {children}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    paddingVertical: 8,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    width: "80%",
  },
  pressable: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});
