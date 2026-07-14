import { useTheme } from "@/theme";
import { StyleSheet, Text } from "react-native";

type Props = {
  focused: boolean;
  text: string;
};

export default function TabBarLabel({ focused, text }: Props) {
  const { typography, colors } = useTheme();
  return (
    <Text
      style={[
        typography.caption,
        {
          marginTop: 6,
          color: focused ? "white" :colors.tabIconDefault
        },
      ]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {text}
    </Text>
  );
}

const styles = StyleSheet.create({
  textStyle: {
  },
});
