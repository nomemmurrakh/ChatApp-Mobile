import { API } from "@/services/auth";
import { Client } from "@/types/client";

const authTransforms = {

  loginTransform(response: API.LoginResponse): Client.AuthSession {
    return {
      ...response,
    };
  },

};

export default authTransforms;
