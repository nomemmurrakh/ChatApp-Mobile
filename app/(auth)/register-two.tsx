import Icons from "@/assets/svg";
import LinkText from "@/components/ui/basic/LinkText";
import RegisterTwoForm from "@/components/ui/register/RegisterTwoForm";
import { useErrorModal } from "@/hooks/ErrorModalProvider";
import useAuthStore from "@/storage/authStorage";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function HomeScreen() {
  const { navigate, dismiss } = useRouter();
  const { getGradient, typography, colors } = useTheme();
  const { setQueryData } = useQueryClient();
  const { showError } = useErrorModal();
  const { login } = useAuthStore((state) => state);
  const [loading, setLoading] = useState(false);

  const onSubmit = (otp: string) => {
    Keyboard.dismiss();
    // setLoading(true);
    setTimeout(() => {
      navigate("/register-three");
    }, 2000);
  };

  const navigateToSignIn = () => {
    dismiss(2);
  };
  const navigateToForgotPassword = () => {};

  return (
    <KeyboardAvoidingView behavior={"padding"} style={styles.container}>
      <LinearGradient
        dither={false}
        colors={asTuple(getGradient("backgroundGradient"))}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.background}
      >
        <View style={{ alignItems: "center" }}>
          <Icons.Logo />
          <Text style={[typography.h1, { color: colors.text }]}>ChatApp</Text>
          <Text
            style={[
              typography.body,
              { color: colors.textSecondary, marginTop: 4 },
            ]}
          >
            Connect instantly, chat securely
          </Text>
        </View>

        <RegisterTwoForm loading={loading} onSubmit={onSubmit} />

        <View style={styles.row}>
          <Text
            style={[
              typography.caption,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Already have an account?
          </Text>
          <LinkText text="Sign In" onPress={navigateToSignIn} />
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    gap: 48,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});
