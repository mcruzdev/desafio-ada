import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { DeleteCard } from "../../../domain/usecases/impl/delete-card-usecase";
import { DeleteCardController } from "../../../infra/controllers/delete-card-controller";

export const makeDeleteCardController = (): DeleteCardController => {
  const cardRepository = new DbCardRepository();
  const deleteCardUseCase = new DeleteCard(cardRepository);
  return new DeleteCardController(deleteCardUseCase);
};
