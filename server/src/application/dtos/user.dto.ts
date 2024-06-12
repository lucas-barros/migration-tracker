import { Role, UserJson } from "../../domain/entities/user.entity";

export interface Error {
  error: string;
}

export interface SignUpPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
  location: string;
}

export interface SignInPayload {
  email: string;
  password: string;
}

export type UserResponse = (UserJson & { token: string }) | Error;
