import { Dispatch, SetStateAction, useState } from "react";
import { config } from "../config";
import { serverApi } from "../api";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import { AxiosError } from "axios";
import { Role, User } from "../types/user";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { Location } from "../types/location";

export interface AuthForm {
  name: string;
  email: string;
  password: string;
  location?: Location;
}

export type SetForm = Dispatch<SetStateAction<AuthForm>>;

export type AuthFormMutation = UseMutationResult<
  User,
  AxiosError<{ error: string }>,
  AuthForm
>;

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<AuthForm>({
    name: "",
    email: "",
    password: "",
    location: undefined,
  });

  const onSuccess = (user: User) => {
    console.log(user);

    localStorage.setItem("token", user.token);
    if (user.role === Role.Biologist) {
      navigate(routes.biologist);
    } else {
      navigate(routes.citizen);
    }
  };

  const signInMutation = useMutation<
    User,
    AxiosError<{ error: string }>,
    AuthForm
  >({
    mutationFn: async (form) => {
      const response = await serverApi.post<User>(
        `${config.serverHost}/auth/sign-in`,
        form,
      );
      return response.data;
    },
    onSuccess,
  });

  const signUpMutation = useMutation<
    User,
    AxiosError<{ error: string }>,
    AuthForm
  >({
    mutationFn: async (form) => {
      const response = await serverApi.post<User>(
        `${config.serverHost}/auth/sign-up`,
        form,
      );
      return response.data;
    },
    onSuccess,
  });

  return {
    form,
    setForm,
    signInMutation,
    signUpMutation,
  };
};
