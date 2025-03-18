import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../stores/auth";
import axios from "axios";

// @ts-ignore
const API_URL = import.meta.env.VITE_BACKEND_URL;

const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  });
  return response.data;
};

export const useLogin = () => {
  const { setUser } = useAuthStore();
  return useMutation({
    mutationFn: (loginData: { email: string; password: string }) => {
      return login(loginData.email, loginData.password);
    },
    onSuccess: (data) => {
      setUser(data.user);
      console.log("Login başarılı", data);
    },
    onError: (error) => {
      console.error("Login hatası", error);
    },
  });
};
