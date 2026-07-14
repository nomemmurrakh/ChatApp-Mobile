import GradientButton from "@/components/ui/basic/GradientButton";
import TextField from "@/components/ui/basic/TextField";
import { Form, RegisterThreeSchema } from "@/forms/schemas";
import { getGradient, useTheme } from "@/theme";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Card from "../basic/Card";
import Spacer from "../basic/Spacer";
import PasswordVisibleIcon from "../login/PasswordVisibleIcon";

type RegisterThreeFormProps = {
  loading: boolean;
  onSubmit: (values: Form.RegisterThreeValues) => void;
};

export default function RegisterThreeForm({
  loading,
  onSubmit,
}: RegisterThreeFormProps) {
  const { typography, colors } = useTheme();

  const [secureText, setSecureText] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [secureTextAgain, setSecureTextAgain] = useState(false);
  const [passwordFocusedAgain, setPasswordFocusedAgain] = useState(false);

  const initialValues: Form.RegisterThreeValues = {
    password: "",
    confirmPassword: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => onSubmit(values)}
      validateOnChange
      isInitialValid={false}
      validationSchema={RegisterThreeSchema}
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
          <Text style={[typography.bodySmall, { color: "#ffffffFF" }]}>
            Please set password for your new account.
          </Text>
          <Spacer height={16} />
          <TextField
            placeholder="Enter password"
            inputMode="text"
            label="Password"
            onBlur={handleBlur("password")}
            value={values.password}
            onChangeText={handleChange("password")}
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
          <Spacer height={16} />
          <TextField
            placeholder="Enter password again"
            inputMode="text"
            label="Confirm Password"
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
            right={
              <PasswordVisibleIcon
                focused={passwordFocusedAgain}
                secureText={secureTextAgain}
                onPress={() => setSecureTextAgain((prev) => !prev)}
              />
            }
            secureTextEntry={!secureTextAgain}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            onFocused={(it) => setPasswordFocusedAgain(it)}
            error={errors["confirmPassword"]}
            maxLength={8}
          />
          <Spacer height={24} />
          <GradientButton
            disabled={!isValid}
            title="Create Account"
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
});
