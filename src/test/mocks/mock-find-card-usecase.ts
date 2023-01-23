import {
  FindCardInput,
  FindCardOutput,
  FindCardUseCase,
} from "../../domain/usecases/find-card-usecase";

export class MockFindCardUseCase implements FindCardUseCase {
  mockExecute: Function = async () => {};
  async execute(input: FindCardInput): Promise<FindCardOutput> {
    return await this.mockExecute();
  }
}
