import { LoginFormData, RegistrationFormData } from '@/app/signup/schema';
import { apiRequest } from './apiClient';
import { setCookie } from '@/utils/browser';
import { AuthResponse } from '@/types/types';

export const authService = {
  register: (data: RegistrationFormData) => {
    const formData = new FormData();

    if (data.avatar) {
      formData.append('avatar', data.avatar);
    }
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);
    formData.append('password_confirmation', data.password_confirmation);

    return apiRequest('/register', {
      method: 'POST',
      body: formData,
      // headers: {},
    });
  },

  login: async (data: LoginFormData) => {
    const response = await apiRequest<AuthResponse>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (response.token) {
      setCookie('accessToken', response.token, 7);
    }

    return response;
  },
};
