import { JwtAdapter } from "../../../infra/security/jwt-adapter";
import { LoginInput, LoginOutput, LoginUseCase } from "../login-usecase";

export class Login implements LoginUseCase {
  constructor() {}

  async execute(input: LoginInput): Promise<LoginOutput> {
    const { login, senha } = input;
    if (process.env.LOGIN == login && process.env.SENHA == senha) {
      const token = JwtAdapter.generateToken(login);
      return {
        login,
        token,
        unauthorized: false,
      };
    } else {
      return {
        unauthorized: true,
      };
    }
  }
}
