import {
  UpdateCardInput,
  UpdateCardOutput,
  UpdateCardUseCase,
} from "../../domain/usecases/update-card-usecase";

export class MockUpdateCardUseCase implements UpdateCardUseCase {
  mockExecute: Function = async () => {};
  async execute(_: UpdateCardInput): Promise<UpdateCardOutput> {
    return await this.mockExecute();
  }
}
