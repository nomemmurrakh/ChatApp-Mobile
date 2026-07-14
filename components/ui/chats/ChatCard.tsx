import { getGradient, useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "../basic/Avatar";
import Card, { CardProps } from "../basic/Card";

type ChatCardProps = CardProps & {
  item: Chat;
};

export default function ChatCard({ item, cardStyle, ...rest }: ChatCardProps) {
  const { typography, colors } = useTheme();
  return (
    <Card cardStyle={[styles.card, cardStyle]} {...rest}>
      <Avatar
        size={48}
        source={{ uri: item.image }}
        borderColor={colors.online}
      />
      <View style={{ flex: 1, gap: 0 }}>
        <Text style={[typography.contactName, { color: "white" }]}>
          {item.fullname}
        </Text>
        {!item.isTyping && (
          <Text
            style={[typography.messageText, { color: colors.textSecondary }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {item.message}
          </Text>
        )}
        {item.isTyping && (
          <Text style={[typography.caption, { color: colors.accent }]}>
            Typing...
          </Text>
        )}
      </View>
      <View style={{ alignItems: "flex-end", gap: 8 }}>
        <Text style={[typography.timestamp, { color: colors.textSecondary }]}>
          {item.time}
        </Text>
        {item.unreadCount > 0 && (
          <LinearGradient
            dither={false}
            colors={asTuple(getGradient("gradientPrimary"))}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.unreadCount}
          >
            <Text style={[typography.unreadCount, { color: "white" }]}>
              {item.unreadCount}
            </Text>
          </LinearGradient>
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 16,
  },
  unreadCount: {
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
