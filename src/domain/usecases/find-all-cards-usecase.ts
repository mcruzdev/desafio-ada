import { FindCardOutput } from "./find-card-usecase";

export interface FindAllCardsUseCase {
  execute(): Promise<FindAllCardOutput>;
}

export type FindAllCardOutput = FindCardOutput[];
