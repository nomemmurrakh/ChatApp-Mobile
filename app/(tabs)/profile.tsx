import Icons from "@/assets/svg";
import { Avatar } from "@/components/ui/basic/Avatar";
import AccountSettings from "@/components/ui/profile/AccountSettings";
import PreferencesSettings from "@/components/ui/profile/PreferencesSettings";
import PrivacySettings from "@/components/ui/profile/PrivacySettings";
import SettingsCard from "@/components/ui/profile/SettingsCard";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ProfilePage() {
  const { top } = useSafeAreaInsets();
  const { getGradient, typography, colors } = useTheme();

  return (
    <LinearGradient
      dither={false}
      colors={asTuple(getGradient("backgroundGradient"))}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[styles.background, { paddingTop: top + 24 }]}
    >
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
      >
        <Avatar
          source={require("@/assets/images/placeholder.png")}
          size={128}
          style={{ alignSelf: "center" }}
        />
        <AccountSettings />
        <PrivacySettings />
        <PreferencesSettings />
        <View style={{ height: 1, backgroundColor: colors.textSecondary }} />
        <SettingsCard
          IconComponent={Icons.Logout}
          name="Logout"
          iconBackgroundColor={colors.secondary}
          containerStyle={{ marginHorizontal: 8 }}
        />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    gap: 24,
    paddingBottom: 50,
  },
});
