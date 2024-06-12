import bcrypt from "bcrypt";

export class HashService {
  static saltRounds = 10;

  hash(password: string) {
    return bcrypt.hash(password, HashService.saltRounds);
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}
