import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { StyleSheet } from "react-native";
import Animated, {
  interpolateColor,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../basic/Avatar";
import Card from "../basic/Card";
import CircularRipple from "../basic/CircularRipple";

type ChatListHeaderProps = {
  progress: SharedValue<number>;
};

export default function ChatListHeader({ progress }: ChatListHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        progress.value,
        [0, 1],
        ["transparent", "#1a1d29"]
      ),
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: top + 16,
          backgroundColor: colors.background,
        },
        animatedStyle,
      ]}
    >
      <Card containerStyle={{ flex: 1 }}>
        <Avatar size={48} />
      </Card>
      <CircularRipple>
        <Icons.Search color={"white"} />
      </CircularRipple>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 16,
    width: "100%",

    paddingBottom: 16,
    paddingStart: 24,
    paddingEnd: 16,
  },
});
