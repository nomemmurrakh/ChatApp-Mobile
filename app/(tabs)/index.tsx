import ChatCard from "@/components/ui/chats/ChatCard";
import ChatListHeader from "@/components/ui/chats/ChatListHeader";
import Constants from "@/constants";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { createItemSeparator } from "@/utils/components";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
} from "react-native";
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";

export default function HomeScreen() {
  const router = useRouter();
  const isScrollingRef = useRef(false);
  const listHeaderBgColorProgress = useSharedValue(0);

  const { getGradient } = useTheme();

  const ItemSeparator = useMemo(() => createItemSeparator(8), []);

  const renderItem: ListRenderItem<Chat> = useCallback(
    ({ item }) => (
      <ChatCard
        item={item}
        containerStyle={styles.cardContainer}
        onPress={() => router.navigate("/chat")}
      />
    ),
    []
  );

  const renderListHeader = useCallback(
    () => <ChatListHeader progress={listHeaderBgColorProgress} />,
    [listHeaderBgColorProgress]
  );

  const handleOnScoll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;
    if (contentOffset.y > 0 && !isScrollingRef.current) {
      isScrollingRef.current = true;
      listHeaderBgColorProgress.value = withTiming(1, {
        duration: 500,
        easing: Easing.linear,
      });
    } else if (contentOffset.y <= 0 && isScrollingRef.current) {
      isScrollingRef.current = false;
      listHeaderBgColorProgress.value = withTiming(0, {
        duration: 500,
        easing: Easing.linear,
      });
    }
  };

  return (
    <LinearGradient
      dither={false}
      colors={asTuple(getGradient("backgroundGradient"))}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.background]}
    >
      <FlatList
        contentContainerStyle={[styles.listContentContainer]}
        data={Constants.dummyChats}
        ListHeaderComponent={renderListHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparator}
        keyExtractor={(_, index) => `${index}`}
        stickyHeaderIndices={[0]}
        onScroll={handleOnScoll}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    gap: 8,
  },
  listContentContainer: {
    paddingBottom: 50,
  },
  cardContainer: {
    paddingHorizontal: 8,
  },
});
