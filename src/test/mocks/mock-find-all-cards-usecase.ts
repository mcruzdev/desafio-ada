import {
  DeleteCardInput,
  DeleteCardOutput,
  DeleteCardUseCase,
} from "../../domain/usecases/delete-card-usecase";
import {
  FindAllCardOutput,
  FindAllCardsUseCase,
} from "../../domain/usecases/find-all-cards-usecase";

export class MockFindAllCardsUseCase implements FindAllCardsUseCase {
  mockExecute: Function = async () => {};
  async execute(): Promise<FindAllCardOutput> {
    return await this.mockExecute();
  }
}
