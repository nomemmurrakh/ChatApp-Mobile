import { Form } from "@/forms/schemas";
import { API, authService } from "@/services/auth";
import authTransforms from "@/transforms/auth";
import { cleanPhoneNumber } from "@/utils";

const authMutations = {
  async login(values: Form.LoginValues) {
    const cleanedPhoneNumber = cleanPhoneNumber(values.phoneNumber);
    const credentials: API.Credentials = {
      ...values,
      phoneNumber: cleanedPhoneNumber,
    };
    const response = await authService.login(credentials);
    return authTransforms.loginTransform(response);
  },
};

export default authMutations;
