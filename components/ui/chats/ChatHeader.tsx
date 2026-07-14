import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar } from "../basic/Avatar";
import CircularRipple from "../basic/CircularRipple";

type ChatHeaderProps = {};

export default function ChatHeader({}: ChatHeaderProps) {
  const { top } = useSafeAreaInsets();
  const { colors, typography } = useTheme();

  return (
    <View
      style={[
        styles.container,
        { paddingTop: top, backgroundColor: colors.glass },
      ]}
    >
      <View style={styles.header}>
        <CircularRipple size={32}>
          <Icons.ArrowLeft
            color={"white"}
            width={24}
            height={24}
            style={{ marginStart: -3 }}
          />
        </CircularRipple>
        <Avatar size={40} source={require("@/assets/images/placeholder.png")} />
        <View style={{}}>
          <Text
            style={[typography.chatHeaderName, { color: "white" }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            Ethan Carter
          </Text>
          <Text style={[typography.caption, { color: "#A492C9" }]}>Online</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    height: 64,
  },
});
