import {
  CreateCardInput,
  CreateCardOutput,
  CreateCardUseCase,
} from "../../domain/usecases/create-card-usecase";

export class MockLoginUseCase implements CreateCardUseCase {
  mockExecute: Function = async () => {};
  async execute(_: CreateCardInput): Promise<CreateCardOutput> {
    return await this.mockExecute();
  }
}
