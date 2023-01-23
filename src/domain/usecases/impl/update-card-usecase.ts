import { validateCard } from "../../entities/card";
import { CardRepository } from "../../repositories/card-repository";
import {
  UpdateCardInput,
  UpdateCardOutput,
  UpdateCardUseCase,
} from "../update-card-usecase";

export class UpdateCard implements UpdateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}
  async execute(input: UpdateCardInput): Promise<UpdateCardOutput> {
    const errors = validateCard({
      card: { ...input },
      validateId: true,
    });

    if (errors.length) {
      return {
        errors,
        success: false,
        input,
      };
    }

    const card = await this.cardRepository.findById(input.id);

    if (!card) {
      return {
        exists: false,
        success: false,
        errors: [],
        input,
      };
    }

    const result: boolean = await this.cardRepository.update(input.id, {
      id: input.id,
      titulo: input.titulo,
      conteudo: input.conteudo,
      lista: input.lista,
    });

    return {
      errors: [],
      input,
      success: result,
      exists: true,
    };
  }
}
