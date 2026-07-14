import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import {
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  focused: boolean;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
};

export default function AddChatTabButton({ focused, onPress }: Props) {
  const { colors, getGradient } = useTheme();
  const { bottom } = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginBottom: bottom }]}>
      <View style={styles.out}>
        <Pressable
          android_ripple={{
            color: "rgba(255, 255, 255, 0.08)",
            borderless: true,
            foreground: true,
          }}
          onPress={onPress}
          style={({ pressed }) => {
            return [
              {
                opacity: Platform.OS === "ios" && pressed ? 0.5 : 1,
              },
            ];
          }}
        >
          <LinearGradient
            dither={false}
            colors={asTuple(getGradient("gradientTab"))}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={[
              styles.innerCircle,
              {
                borderColor: focused ? "white" : colors.tabIconDefault,
              },
            ]}
          >
            <Icons.EditSquare
              width={24}
              height={24}
              color={focused ? "white" : colors.tabIconDefault}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    transform: [{ translateY: -25 }],
  },
  out: {
    overflow: "hidden",
    borderRadius: 100,
  },
  innerCircle: {
    borderWidth: 3,
    width: 75,
    height: 75,
    borderRadius: 61,
    justifyContent: "center",
    alignItems: "center",
  },
});
