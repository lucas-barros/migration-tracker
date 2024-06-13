import { Point } from "geojson";
import { User as UserModel } from "../../infrastructure/database/model/User";

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
    location: { lat: number; lng: number };
    role?: string;
  }) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.role = this.assignRole(email, role);
    this.location = {
      type: "Point",
      coordinates: [location.lat, location.lng],
    };
  }

  assignRole(email: string, role?: string): Role {
    if (role) {
      return role === Role.Biologist ? Role.Biologist : Role.Citizen;
    }

    return email.endsWith("@biology.com") ? Role.Biologist : Role.Citizen;
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

  static fromPersistence(model: UserModel) {
    const [lat, lng] = model.location.coordinates;
    return new User({ ...model, location: { lat, lng } });
  }
}
