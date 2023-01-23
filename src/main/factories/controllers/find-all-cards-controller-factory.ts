import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { FindAllCards } from "../../../domain/usecases/impl/find-all-cards-usecase";
import { FindAllCardsController } from "../../../infra/controllers/find-all-cards-controller";

export const makeFindAllCardsController = (): FindAllCardsController => {
  const cardRepository = new DbCardRepository();
  const findAllCardsUseCase = new FindAllCards(cardRepository);
  return new FindAllCardsController(findAllCardsUseCase);
};
