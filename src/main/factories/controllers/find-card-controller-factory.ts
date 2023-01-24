import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { FindCard } from "../../../domain/usecases/impl/find-card-usecase";
import { FindCardController } from "../../../infra/controllers/find-card-controller";
import { FindCardRouter } from "../../../presentation/routes/find-card-router";

export const makeFindCardController = (): FindCardController => {
  const cardRepository = new DbCardRepository();
  const findCardUseCase = new FindCard(cardRepository);
  const findCardRouter = new FindCardRouter(findCardUseCase);
  return new FindCardController(findCardRouter);
};
