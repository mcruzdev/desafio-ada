import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { FindAllCards } from "../../../domain/usecases/impl/find-all-cards-usecase";
import { FindAllCardsController } from "../../../infra/controllers/find-all-cards-controller";
import { FindAllCardsRouter } from "../../../presentation/routes/find-all-cards-router";

export const makeFindAllCardsController = (): FindAllCardsController => {
  const cardRepository = new DbCardRepository();
  const findAllCardsUseCase = new FindAllCards(cardRepository);
  const findAllCardsRouter = new FindAllCardsRouter(findAllCardsUseCase);
  return new FindAllCardsController(findAllCardsRouter);
};
