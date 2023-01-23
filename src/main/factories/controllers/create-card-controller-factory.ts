import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { CreateCard } from "../../../domain/usecases/impl/create-card-usecase";
import { CreateCardController } from "../../../infra/controllers/create-card-controller";
import { CreateCardRouter } from "../../../presentation/routes/create-card-router";

export const makeCreateCardController = (): CreateCardController => {
  const cardRepository = new DbCardRepository();
  const createCardUseCase = new CreateCard(cardRepository);
  const createCardRouter = new CreateCardRouter(createCardUseCase);
  return new CreateCardController(createCardRouter);
};
