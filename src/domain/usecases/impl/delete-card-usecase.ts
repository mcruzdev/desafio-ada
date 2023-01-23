import { CardRepository } from "../../repositories/card-repository";
import {
  DeleteCardInput,
  DeleteCardOutput,
  DeleteCardUseCase,
} from "../delete-card-usecase";

export class DeleteCard implements DeleteCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}

  async execute(input: DeleteCardInput): Promise<DeleteCardOutput> {
    const result = await this.cardRepository.delete(input.id);
    return {
      success: result,
    };
  }
}
