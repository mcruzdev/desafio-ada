import { DbCardRepository } from "../../../data/db/repositories/db-card-repository";
import { UpdateCard } from "../../../domain/usecases/impl/update-card-usecase";
import { UpdateCardController } from "../../../infra/controllers/update-card-controller";

export const makeUpdateCardController = (): UpdateCardController => {
  const cardRepository = new DbCardRepository();
  const updateCardUseCase = new UpdateCard(cardRepository);
  return new UpdateCardController(updateCardUseCase);
};
