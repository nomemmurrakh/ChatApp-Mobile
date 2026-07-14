import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { Text, View } from "react-native";
import SettingsCard from "./SettingsCard";

export default function PrivacySettings() {
  const { typography } = useTheme();
  return (
    <View style={{ gap: 8, marginHorizontal: 8 }}>
      <Text style={[typography.h3, { color: "white", marginStart: 16 }]}>
        Privacy & Security
      </Text>
      <SettingsCard IconComponent={Icons.Block} name="Blocked Contacts" />
      <SettingsCard
        IconComponent={Icons.Encryption}
        name="End-to-End Encryption"
      />
    </View>
  );
}
