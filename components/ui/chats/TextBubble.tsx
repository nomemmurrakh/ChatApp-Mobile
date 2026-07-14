import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";

type TextBubbleProps = {
  item: Message;
  me: boolean;
};

const { width } = Dimensions.get("window");
export default function TextBubble({ item, me }: TextBubbleProps) {
  const { getGradient, colors, typography } = useTheme();
  return (
    <LinearGradient
      dither={false}
      colors={asTuple(getGradient(me ? "gradientMessage" : "gradientTab"))}
      start={{ x: 0.1, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={[styles.bubble, me ? styles.myBubble : styles.otherBubble]}
    >
      <Text style={[typography.messageContent, styles.content]}>
        {item.content}
      </Text>
      <View
        style={[
          styles.formattedTime,
          {
            flexDirection: me ? "row" : "row-reverse",
          },
        ]}
      >
        <Text style={[typography.messageTime, { color: "#D1D5DB" }]}>
          {item.time}
        </Text>
        {me && (
          <>
            {item.sent && !item.read && (
              <Icons.SingleCheck
                width={16}
                height={16}
                color={colors.textSecondary}
              />
            )}
            {item.read && item.read && (
              <Icons.DoubleCheck
                width={16}
                height={16}
                color={colors.textSecondary}
              />
            )}
          </>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  bubble: {
    padding: 16,
    maxWidth: width * 0.75,
  },
  myBubble: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
    alignSelf: "flex-end",
  },
  otherBubble: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    alignSelf: "flex-start",
  },
  formattedTime: {
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 4,
    marginTop: 8,
  },
  content: {
    color: "white",
  },
});
