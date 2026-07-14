import Icons from "@/assets/svg";
import { useTheme } from "@/theme";
import { Text, View } from "react-native";
import SettingsCard from "./SettingsCard";

export default function AccountSettings() {
  const { typography } = useTheme();
  return (
    <View style={{ gap: 8, marginHorizontal: 8 }}>
      <Text style={[typography.h3, { color: "white", marginStart: 16 }]}>
        Account
      </Text>
      <SettingsCard
        IconComponent={Icons.Camera}
        name="Profile Photo"
        description="Tap to change your profile photo"
        onPress={() => {
          console.log("cjdj");
        }}
      />
      <SettingsCard
        IconComponent={Icons.Profile}
        name="Name"
        description="Ethan Carter"
        onPress={() => {
          console.log("cjdj");
        }}
      />
      <SettingsCard
        IconComponent={Icons.Call}
        name="Phone Number"
        description="+1 (555) 123-4567"
        onPress={() => {
          console.log("cjdj");
        }}
      />
      <SettingsCard
        IconComponent={Icons.Status}
        name="Status"
        description="Available"
        onPress={() => {
          console.log("cjdj");
        }}
      />
    </View>
  );
}
