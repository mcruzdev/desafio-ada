import { Card } from "../entities/card";

export interface CardRepository {
  save(card: Card): Promise<Card>;
  findById(id: string): Promise<Card | null>;
  findAll(): Promise<Card[]>;
  delete(id: string): Promise<boolean>;
  update(id: string, card: Card): Promise<boolean>;
}
