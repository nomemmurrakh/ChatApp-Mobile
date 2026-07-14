import GradientButton from "@/components/ui/basic/GradientButton";
import TextField from "@/components/ui/basic/TextField";
import PasswordVisibleIcon from "@/components/ui/login/PasswordVisibleIcon";
import { Form, LoginSchema } from "@/forms/schemas";
import { getGradient, useTheme } from "@/theme";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Card from "../basic/Card";
import LinkText from "../basic/LinkText";
import Spacer from "../basic/Spacer";

type LoginFormProps = {
  loading: boolean;
  onSubmit: (values: Form.LoginValues) => void;
  onForgotPassword: () => void;
};

export default function LoginForm({
  loading,
  onSubmit,
  onForgotPassword,
}: LoginFormProps) {
  const { typography, colors } = useTheme();
  const initialValues: Form.LoginValues = {
    phoneNumber: "",
    password: "",
  };
  const [secureText, setSecureText] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  // helper to format phone into 3xx-xxxxxxx
  const formatPhone = (value: string) => {
    const digitsOnly = value.replace(/\D/g, ""); // remove non-digits
    return digitsOnly.replace(/^(\d{3})(\d{0,7})$/, (_, p1, p2) =>
      p2 ? `${p1}-${p2}` : p1
    );
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validateOnChange
      isInitialValid={false}
      validationSchema={LoginSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        isValid,
      }) => (
        <Card
          cardStyle={styles.card}
          containerStyle={{ width: "100%" }}
          disabled
        >
          <TextField
            placeholder="3XX-XXXXXXX"
            inputMode="tel"
            label="Phone number"
            onBlur={handleBlur("phoneNumber")}
            onChangeText={(it) => {
              const formattedPhone = formatPhone(it);
              handleChange("phoneNumber")(formattedPhone);
            }}
            value={values.phoneNumber}
            inputStyle={styles.input}
            error={errors["phoneNumber"]}
            maxLength={11}
            left={
              <Text
                style={[
                  typography.caption,
                  {
                    marginStart: 4,
                    color: colors.textSecondary,
                  },
                ]}
              >
                +92
              </Text>
            }
          />
          <Spacer height={16} />
          <TextField
            placeholder="Enter your password"
            inputMode="text"
            label="Password"
            onBlur={handleBlur("password")}
            value={values.password}
            onChangeText={handleChange("password")}
            inputStyle={styles.input}
            right={
              <PasswordVisibleIcon
                focused={passwordFocused}
                secureText={secureText}
                onPress={() => setSecureText((prev) => !prev)}
              />
            }
            secureTextEntry={!secureText}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            onFocused={(it) => setPasswordFocused(it)}
            error={errors["password"]}
            maxLength={8}
          />
          <Spacer height={8} />
          <LinkText
            text="Forgot Password?"
            onPress={onForgotPassword}
            style={{ alignSelf: "flex-end" }}
          />
          <Spacer height={32} />
          <GradientButton
            disabled={!isValid}
            title="Sign In"
            onPress={handleSubmit}
            loading={loading}
            colors={getGradient("gradientSecondary")}
          />
        </Card>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 24,
  },
  input: {
    marginTop: 0,
  },
});
