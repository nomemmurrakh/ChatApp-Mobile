import Icons from "@/assets/svg";
import CircularRipple from "@/components/ui/basic/CircularRipple";
import TextField from "@/components/ui/basic/TextField";
import ChatHeader from "@/components/ui/chats/ChatHeader";
import TextBubble from "@/components/ui/chats/TextBubble";
import Constants from "@/constants";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { createItemSeparator } from "@/utils/components";
import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ChatPage() {
  const { getGradient, colors } = useTheme();
  const { top, bottom } = useSafeAreaInsets();

  const ItemSeparator = useMemo(() => createItemSeparator(16), []);

  return (
    <LinearGradient
      dither={false}
      colors={asTuple(getGradient("backgroundGradient"))}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.background, { paddingBottom: bottom }]}
    >
      <ChatHeader />
      <FlatList
        contentContainerStyle={styles.messagesContainerStyle}
        data={Constants.dummyMessages}
        renderItem={({ item, index }) => (
          <TextBubble item={item} me={index % 2 === 0} />
        )}
        keyExtractor={(item, index) => `${index}`}
        ItemSeparatorComponent={ItemSeparator}
        inverted
      />
      <KeyboardAvoidingView behavior="padding">
        <View style={styles.bottom}>
          <TextField
            placeholder="Message..."
            outerContainerStyle={styles.textInputOuter}
            multiline
            numberOfLines={3}
            inputContainerStyle={[
              styles.textInput,
              { backgroundColor: colors.glass },
            ]}
          />
          <CircularRipple style={{ backgroundColor: "#5B13EC" }} size={48}>
            <Icons.Send color={"white"} width={24} height={24} />
          </CircularRipple>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  messagesContainerStyle: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    gap: 8,
  },
  textInputOuter: {
    flex: 1,
    marginVertical: 8,
  },
  textInput: {
    borderRadius: 36,
    maxWidth: "100%",
    minHeight: 46,
  },
});
