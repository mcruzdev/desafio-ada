import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { DeleteCard } from "../../../domain/usecases/impl/delete-card-usecase";
import { DeleteCardController } from "../../../infra/controllers/delete-card-controller";
import { DeleteCardRouter } from "../../../presentation/routes/delete-card-router";

export const makeDeleteCardController = (): DeleteCardController => {
  const cardRepository = new DbCardRepository();
  const deleteCardUseCase = new DeleteCard(cardRepository);
  const deleteCardRouter = new DeleteCardRouter(deleteCardUseCase);
  return new DeleteCardController(deleteCardRouter);
};
