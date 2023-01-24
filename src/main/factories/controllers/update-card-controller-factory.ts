import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { UpdateCard } from "../../../domain/usecases/impl/update-card-usecase";
import { UpdateCardController } from "../../../infra/controllers/update-card-controller";
import { UpdateCardRouter } from "../../../presentation/routes/update-card-router";

export const makeUpdateCardController = (): UpdateCardController => {
  const cardRepository = new DbCardRepository();
  const updateCardUseCase = new UpdateCard(cardRepository);
  const updateCardRouter = new UpdateCardRouter(updateCardUseCase);
  return new UpdateCardController(updateCardRouter);
};
