import GradientButton from "@/components/ui/basic/GradientButton";
import TextField from "@/components/ui/basic/TextField";
import { Form, RegisterThreeSchema } from "@/forms/schemas";
import { getGradient, useTheme } from "@/theme";
import { Formik } from "formik";
import { useState } from "react";
import { StyleSheet, Text } from "react-native";
import Card from "../basic/Card";
import Spacer from "../basic/Spacer";
import UploadImage from "../basic/UploadImage";

type RegisterFourFormProps = {
  loading: boolean;
  onSubmit: (values: Form.RegisterThreeValues) => void;
};

export default function RegisterFourForm({
  loading,
  onSubmit,
}: RegisterFourFormProps) {
  const { typography, colors } = useTheme();

  const [image, setImage] = useState("");

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
            Please set your profile picture and full name.
          </Text>
          <Spacer height={16} />
          <UploadImage
            onRemove={() => setImage("")}
            onSelected={(it) => setImage(it)}
            image={image}
            containerStyle={{ alignItems: "center" }}
            
          />
          <Spacer height={16} />
          <TextField
            placeholder="Enter Your Full Name"
            inputMode="text"
            label="Full Name"
            onBlur={handleBlur("confirmPassword")}
            value={values.confirmPassword}
            onChangeText={handleChange("confirmPassword")}
          />
          <Spacer height={24} />
          <GradientButton
            disabled={!isValid}
            title="Complete"
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
