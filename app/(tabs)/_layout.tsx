import Icons from "@/assets/svg";
import AddChatTabButton from "@/components/bottomtab/AddChatTabButton";
import TabBarButton from "@/components/bottomtab/TabBarButton";
import TabBarIcon from "@/components/bottomtab/TabBarIcon";
import TabBarLabel from "@/components/bottomtab/TabBarLabel";
import { useTheme } from "@/theme";
import { Tabs } from "expo-router";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [routeName, setRouteName] = useState("");

  return (
    <Tabs
      screenListeners={{
        tabPress: (e) => {
          setRouteName(e.target?.split("-")[0] as string);
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBarStyle,
          {
            height: insets.bottom + 80,
            paddingBottom: 0,
          },
        ],
        tabBarItemStyle: styles.tabBarItemStyle,
        sceneStyle: styles.sceneStyle,
        tabBarActiveTintColor: colors.tabIconSelected,
        tabBarInactiveTintColor: colors.tabIconDefault,

        tabBarButton: ({ children, onPress }) => (
          <TabBarButton children={children} onPress={onPress} />
        ),

        tabBarLabel: ({ focused, children }) => (
          <TabBarLabel text={children} focused={focused} />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={
                <Icons.Chat color={focused ? "white" : colors.tabIconDefault} />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "",
          tabBarLabel: () => null,
          tabBarIcon: () => null,
          tabBarButton: ({ onPress }) => (
            <AddChatTabButton
              focused={routeName === "explore"}
              onPress={onPress}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={
                <Icons.Profile
                  color={focused ? "white" : colors.tabIconDefault}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  tabBarStyle: {
    zIndex: 2,
    backgroundColor: "#412f76",
    borderColor: "transparent",
    paddingHorizontal: 24,
  },
  tabBarItemStyle: {},
  sceneStyle: {},
  circleContainer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "flex-start",
    alignItems: "center",
    zIndex: 1,
    backgroundColor: "transparent",
  },
  circle: {
    position: "relative",
    top: -25,
    left: 0,
    width: 80,
    height: 80,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,

    elevation: 10,
  },
});
