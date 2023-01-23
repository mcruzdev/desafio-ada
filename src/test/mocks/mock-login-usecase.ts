import {
  LoginInput,
  LoginOutput,
  LoginUseCase,
} from "../../domain/usecases/login-usecase";

export class MockLoginUseCase implements LoginUseCase {
  mockExecute: Function = async () => {};
  async execute(_: LoginInput): Promise<LoginOutput> {
    return await this.mockExecute();
  }
}
