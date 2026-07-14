import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { Text, View } from "react-native";
import SettingsCard from "./SettingsCard";

export default function PreferencesSettings() {
  const { typography } = useTheme();
  return (
    <View style={{ gap: 8, marginHorizontal: 8 }}>
      <Text style={[typography.h3, { color: "white", marginStart: 16 }]}>
        Preferences
      </Text>
      <SettingsCard IconComponent={Icons.Notification} name="Notifications" />
      <SettingsCard IconComponent={Icons.Chat} name="Chat Settings" />
      <SettingsCard IconComponent={Icons.Appearance} name="Appearance" />
    </View>
  );
}
