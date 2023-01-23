import {
  DeleteCardInput,
  DeleteCardOutput,
  DeleteCardUseCase,
} from "../../domain/usecases/delete-card-usecase";

export class MockDeleteCardUseCase implements DeleteCardUseCase {
  mockExecute: Function = async () => {};
  async execute(input: DeleteCardInput): Promise<DeleteCardOutput> {
    return await this.mockExecute();
  }
}
