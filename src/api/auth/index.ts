import { useMutation } from "@tanstack/react-query";
import useAuthStore from "../../stores/auth";
import axios from "axios";
import toast from "react-hot-toast";
import {API_URL} from "../getBackendUrl";

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
    },
    onError: (error) => {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    },
  });
};
