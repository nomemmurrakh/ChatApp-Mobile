import Icons from "@/assets/svg";
import GradientButton from "@/components/ui/basic/GradientButton";
import TextField from "@/components/ui/basic/TextField";
import { Form, RegisterOneSchema } from "@/forms/schemas";
import { getGradient, useTheme } from "@/theme";
import { Formik } from "formik";
import { StyleSheet, Text, View } from "react-native";
import Card from "../basic/Card";
import Spacer from "../basic/Spacer";

type RegisterOneFormProps = {
  loading: boolean;
  onSubmit: (values: Form.RegisterOneValues) => void;
};

export default function RegisterOneForm({
  loading,
  onSubmit,
}: RegisterOneFormProps) {
  const { typography, colors } = useTheme();

  const initialValues: Form.RegisterOneValues = {
    phoneNumber: "",
  };

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
      validationSchema={RegisterOneSchema}
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
            label="Enter Your Phone number"
            onBlur={handleBlur("phoneNumber")}
            onChangeText={(it) => {
              const formattedPhone = formatPhone(it);
              handleChange("phoneNumber")(formattedPhone);
            }}
            value={values.phoneNumber}
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
          <View>
            <Text style={[typography.caption, { color: "#ffffffFF" }]}>
              <Text style={{ fontWeight: "600" as const }}>Note:</Text> An OTP
              will be sent to this number.
            </Text>
          </View>
          <Spacer height={24} />
          <GradientButton
            disabled={!isValid}
            title="Continue"
            onPress={handleSubmit}
            loading={loading}
            colors={getGradient("gradientSecondary")}
            right={
              <Icons.ArrowRightSolid color={"white"} width={18} height={18} />
            }
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
