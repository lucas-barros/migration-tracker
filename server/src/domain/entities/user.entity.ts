import { Point } from "geojson";

export enum Role {
  Citizen = "Citizen",
  Biologist = "Biologist",
}

export interface UserJson {
  id?: number;
  name: string;
  email: string;
  location: Point;
  role: Role;
}

export class User {
  private id?: number;
  private name: string;
  private password: string;
  private email: string;
  private location: Point;
  private role: Role;
  private token: string = "";

  constructor({
    id,
    name,
    email,
    password,
    location,
    role,
  }: {
    id?: number;
    name: string;
    email: string;
    password: string;
    location: Point | string;
    role: string;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = role === Role.Biologist ? Role.Biologist : Role.Citizen;
    this.location =
      typeof location === "string"
        ? {
            type: "Point",
            coordinates: location.split(",").map(Number),
          }
        : location;
  }

  getEmail(): string {
    return this.email;
  }

  getName(): string {
    return this.name;
  }

  getPassword(): string {
    return this.password;
  }

  getRole(): Role {
    return this.role;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken() {
    return this.token;
  }

  toJson(): UserJson {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      role: this.role,
      location: this.location,
    };
  }

  toPersistence() {
    return {
      name: this.name,
      password: this.password,
      email: this.email,
      role: this.role,
      location: this.location,
    };
  }
}
