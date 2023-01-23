import { CardRepository } from "../../repositories/card-repository";
import {
  FindAllCardOutput,
  FindAllCardsUseCase,
} from "../find-all-cards-usecase";

export class FindAllCards implements FindAllCardsUseCase {
  constructor(private readonly cardRepository: CardRepository) {}
  async execute(): Promise<FindAllCardOutput> {
    return (await this.cardRepository.findAll()).map((item) => ({
      id: item.id!,
      conteudo: item.conteudo,
      lista: item.lista,
      titulo: item.titulo,
    }));
  }
}
