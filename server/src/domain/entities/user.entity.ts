export enum Role {
  Citizen = "Citizen",
  Biologist = "Biologist",
}

export class User {
  private username: string;
  private password: string;
  private role: Role;

  constructor({
    username,
    password,
    role,
  }: {
    username: string;
    password: string;
    role: Role;
  }) {
    this.username = username;
    this.password = password;
    this.role = role;
  }

  getUsername(): string {
    return this.username;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): Role {
    return this.role;
  }
}
