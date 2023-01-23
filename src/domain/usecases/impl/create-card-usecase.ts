import { validateCard } from "../../entities/card";
import { CardRepository } from "../../repositories/card-repository";
import {
  CreateCardInput,
  CreateCardOutput,
  CreateCardUseCase,
} from "../create-card-usecase";

export class CreateCard implements CreateCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}
  async execute(input: CreateCardInput): Promise<CreateCardOutput> {
    const errors = validateCard({
      card: { ...input },
      validateId: false,
    });

    if (errors.length) {
      return {
        ...input,
        errors: errors,
      };
    }

    const card = await this.cardRepository.save({
      id: undefined,
      titulo: input.titulo,
      conteudo: input.conteudo,
      lista: input.lista,
    });

    return {
      ...card,
      errors: [],
    };
  }
}
