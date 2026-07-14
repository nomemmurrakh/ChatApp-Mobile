import Icons from "@/assets/svg";
import LinkText from "@/components/ui/basic/LinkText";
import RegisterThreeForm from "@/components/ui/register/RegisterThreeForm";
import { Form } from "@/forms/schemas";
import { useErrorModal } from "@/hooks/ErrorModalProvider";
import useAuthStore from "@/storage/authStorage";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function HomeScreen() {
  const { navigate, dismiss } = useRouter();
  const { getGradient, typography, colors } = useTheme();
  const { setQueryData } = useQueryClient();
  const { showError } = useErrorModal();
  const { login } = useAuthStore((state) => state);

  const onSubmit = (values: Form.RegisterThreeValues) => {
    navigate("/register-four");
  };

  const navigateToSignIn = () => {
    dismiss(3);
  };

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

        <RegisterThreeForm loading={false} onSubmit={onSubmit} />

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
