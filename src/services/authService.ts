import { LoginFormData, RegistrationFormData } from "@/app/signup/schema";
import { apiRequest } from "./apiClient";

export const authService = {
  register: (data: RegistrationFormData) =>
    apiRequest('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginFormData) =>
    apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
};
