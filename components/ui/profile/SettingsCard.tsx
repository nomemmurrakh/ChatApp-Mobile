import { useTheme } from "@/theme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ColorValue, StyleSheet, Text, View } from "react-native";
import { SvgProps } from "react-native-svg";
import Card, { CardProps } from "../basic/Card";
import ColoredCircle from "../basic/ColoredCircle";

type SettingsCardProps = CardProps & {
  name: string;
  IconComponent: React.FC<SvgProps>;
  description?: string;
  iconBackgroundColor?: ColorValue;
};

export default function SettingsCard({
  name,
  IconComponent,
  description,
  iconBackgroundColor = "#6448b8",
  containerStyle,
  cardStyle,
  ...rest
}: SettingsCardProps) {
  const { colors, typography } = useTheme();
  return (
    <Card
      containerStyle={[styles.cardContainer, containerStyle]}
      cardStyle={[styles.card, cardStyle]}
      {...rest}
    >
      <ColoredCircle size={40} backgroundColor={iconBackgroundColor}>
        <IconComponent color={"white"} width={24} height={24} />
      </ColoredCircle>
      <View style={{ flex: 1 }}>
        <Text style={[typography.settingName, { color: "white" }]}>{name}</Text>
        {description && (
          <Text
            style={[typography.bodySmall, { color: "#A492C9" }]}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {description}
          </Text>
        )}
      </View>
      <MaterialCommunityIcons
        name="chevron-right"
        color={colors.textSecondary}
        size={24}
      />
    </Card>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 8,
  },
  card: {
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
