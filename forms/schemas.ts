import * as Yup from "yup";

const phoneNumberSchema = Yup.string()
  .required("Phone is required")
  .matches(/^3\d{2}-\d{7}$/, "Invalid phone number");

const passwordSchema = Yup.string()
  .required("Password is required")
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
  );

const otpSchema = Yup.string()
  .required("OTP is required")
  .matches(/^\d{4}$/, "OTP must be 4 digits long.");

export const LoginSchema = Yup.object().shape({
  phoneNumber: phoneNumberSchema,
  password: passwordSchema,
});

export const RegisterOneSchema = Yup.object().shape({
  phoneNumber: phoneNumberSchema,
});

export const RegisterTwoSchema = Yup.object().shape({
  otp: otpSchema,
});

export const RegisterThreeSchema = Yup.object().shape({
  password: passwordSchema,
  confirmPassword: passwordSchema,
});

export namespace Form {
  export type LoginValues = Yup.InferType<typeof LoginSchema>;
  export type RegisterOneValues = Yup.InferType<typeof RegisterOneSchema>;
  export type RegisterTwoValues = Yup.InferType<typeof RegisterTwoSchema>;
  export type RegisterThreeValues = Yup.InferType<typeof RegisterThreeSchema>;
}
