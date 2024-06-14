export enum Role {
  Citizen = "Citizen",
  Biologist = "Biologist",
}

export interface User {
  token: string;
  role: Role;
}
