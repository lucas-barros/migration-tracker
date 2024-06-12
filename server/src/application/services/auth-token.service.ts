import { default as jwt } from "jsonwebtoken";
import { Err, Ok, Result } from "ts-results-es";

export class AuthTokenService {
  secret;
  constructor(secret: string) {
    this.secret = secret;
  }
  verify(token: string): Result<jwt.JwtPayload, string> {
    try {
      const decode = jwt.verify(token, this.secret);
      return Ok(decode as jwt.JwtPayload);
    } catch (error) {
      console.log(error);
      return Err("Invalid token");
    }
  }

  sign(payload: Record<string, unknown>): Result<string, string> {
    try {
      const token = jwt.sign(payload, this.secret, {
        expiresIn: 86400000,
      });

      return Ok(token);
    } catch (error) {
      console.log(error);
      return Err("Failed to sign");
    }
  }
}
