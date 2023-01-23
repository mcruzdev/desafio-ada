import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { FindCard } from "../../../domain/usecases/impl/find-card-usecase";
import { FindCardController } from "../../../infra/controllers/find-card-controller";

export const makeFindCardController = (): FindCardController => {
  const cardRepository = new DbCardRepository();
  const createCardUseCase = new FindCard(cardRepository);
  return new FindCardController(createCardUseCase);
};
