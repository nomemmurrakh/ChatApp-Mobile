import Icons from "@/assets/svg";
import LinkText from "@/components/ui/basic/LinkText";
import LoginForm from "@/components/ui/login/LoginForm";
import { QUERY_KEYS } from "@/constants/auth";
import { Form } from "@/forms/schemas";
import { useErrorModal } from "@/hooks/ErrorModalProvider";
import authMutations from "@/mutations/auth";
import useAuthStore from "@/storage/authStorage";
import { useTheme } from "@/theme";
import { asTuple } from "@/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

export default function HomeScreen() {
  const { navigate } = useRouter();
  const { getGradient, typography, colors } = useTheme();
  const { setQueryData } = useQueryClient();
  const { showError } = useErrorModal();
  const { login } = useAuthStore((state) => state);

  const mutation = useMutation({
    mutationFn: authMutations.login,
    onSuccess: async (session) => {
      try {

        // save in local storage.
        login(session);

        // for user query cache.
        setQueryData(QUERY_KEYS.USER, session.user);

        // navigate to authenticated route.
        // navigate("/private/(tabs)");
      } catch (error) {
        throw new Error("Failed to save login data.");
      }
    },
    onError: (error) => {
      if ("message" in error) {
        showError(error.message);
      }
    },
  });

  const onSubmit = (values: Form.LoginValues) => {
    mutation.mutate(values);
  };

  const navigateToSignUp = () => {
    navigate("/register-four")
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

        <LoginForm
          loading={mutation.isPending}
          onForgotPassword={navigateToForgotPassword}
          onSubmit={onSubmit}
        />

        <View style={styles.row}>
          <Text
            style={[
              typography.caption,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            Don't have an account?
          </Text>
          <LinkText text="Sign Up" onPress={navigateToSignUp} />
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
