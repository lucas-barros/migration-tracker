import { Err, Ok, Result } from "ts-results-es";
import { Container } from "../../application/container";
import { User } from "../entities/user.entity";
import { SignInPayload, SignUpPayload } from "../../application/dtos/user.dto";
import { UserException } from "../exceptions/user.exception";

export interface AuthUseCase {
  signUp: (
    payload: SignUpPayload,
  ) => Promise<Result<User, UserException | string>>;
  signIn: (
    payload: SignInPayload,
  ) => Promise<Result<User, UserException | string>>;
}

export const createAuthUseCase = ({
  hashService,
  authTokenService,
  userRepository,
}: Pick<
  Container,
  "authTokenService" | "hashService" | "userRepository"
>): AuthUseCase => {
  return {
    signUp: async ({
      email,
      location,
      name,
      password,
      role,
    }: SignUpPayload) => {
      const hashedPassword = await hashService.hash(password);
      const user = new User({
        email,
        password: hashedPassword,
        name,
        location,
        role,
      });

      const result = await userRepository.saveOne(user.toPersistence());

      if (result.isErr()) {
        return Err(result.error);
      }

      const tokenResult = authTokenService.sign({
        userId: result.value.id,
      });

      if (tokenResult.isErr()) {
        return Err(tokenResult.error);
      }

      user.setToken(tokenResult.value);

      return Ok(user);
    },
    signIn: async ({ email, password }) => {
      const repositoryResult = await userRepository.findOne({
        where: { email },
      });

      if (!repositoryResult) {
        return Err("No user found for this email");
      }
      const user = User.fromPersistence(repositoryResult);
      const isValid = await hashService.compare(password, user.getPassword());

      if (!isValid) {
        return Err("Wrong password");
      }

      const tokenResult = authTokenService.sign({
        userId: repositoryResult.id,
      });

      if (tokenResult.isErr()) {
        return Err(tokenResult.error);
      }

      user.setToken(tokenResult.value);

      return Ok(user);
    },
  };
};
