import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

type TabBarIconProps = {
  icon: ReactNode;
};

const TabBarIcon = ({ icon }: TabBarIconProps) => {
  return <View style={style.container}>{icon}</View>;
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabBarIcon;
