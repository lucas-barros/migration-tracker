import { Dispatch, SetStateAction, useState } from "react";
import { config } from "../config";
import { serverApi } from "../api";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes";
import axios from "axios";
import { Role } from "../types/user";

enum FormType {
  SignIn = "sign-in",
  SignUp = "sign-up",
}

export interface Form {
  data: {
    name: string;
    email: string;
    password: string;
    location?: { lat: number; lng: number };
  };
  error: string;
  isLoading: boolean;
}

export type SetForm = Dispatch<SetStateAction<Form>>;

export const useAuthForm = (): {
  form: Form;
  setForm: SetForm;
  onSignIn: () => void;
  onSignUp: () => void;
} => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>({
    data: {
      name: "",
      email: "",
      password: "",
      location: undefined,
    },
    error: "",
    isLoading: false,
  });

  const makeOnSubmit = (type: FormType) => async () => {
    try {
      setForm((state) => ({
        ...state,
        error: "",
        isLoading: true,
      }));
      const response = await serverApi.post(
        `${config.serverHost}/auth/${type}`,
        form.data,
      );
      localStorage.setItem("token", response.data?.token);

      if (response.data.role === Role.Biologist) {
        navigate(routes.biologist);
      } else {
        navigate(routes.citizen);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setForm((state) => ({
          ...state,
          error: error.response?.data.error,
        }));
      } else {
        setForm((state) => ({
          ...state,
          error: "Failed",
        }));
      }
    } finally {
      setForm((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  };

  return {
    form,
    setForm,
    onSignIn: makeOnSubmit(FormType.SignIn),
    onSignUp: makeOnSubmit(FormType.SignUp),
  };
};
