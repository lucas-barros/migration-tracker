import { Role } from "../domain/entities/user.entity";

declare global {
  namespace Express {
    interface Locals {
      userId: number;
      permissions: Role;
    }
  }
}
