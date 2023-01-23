import { CardRepository } from "../../repositories/card-repository";
import {
  FindCardInput,
  FindCardOutput,
  FindCardUseCase,
} from "../find-card-usecase";

export class FindCard implements FindCardUseCase {
  constructor(private readonly cardRepository: CardRepository) {}
  async execute(input: FindCardInput): Promise<FindCardOutput> {
    const card: any = await this.cardRepository.findById(input.id);
    if (card?.id) {
      return {
        id: card.id,
        conteudo: card.conteudo,
        lista: card.lista,
        titulo: card.titulo,
      };
    } else {
      return null;
    }
  }
}
