import { Card } from "../../domain/entities/card";
import { CardRepository } from "../../domain/repositories/card-repository";

export class MockCardRepository implements CardRepository {
  mockFindById: Function = () => {};
  mockUpdate: Function = () => {};
  mockDelete: Function = () => {};
  mockSave: Function = () => {};
  mockFindAll: Function = () => {};

  save(card: Card): Promise<Card> {
    return this.mockSave();
  }
  findById(id: string): Promise<Card | null> {
    return this.mockFindById(id);
  }
  findAll(): Promise<Card[]> {
    return this.mockFindAll();
  }
  delete(id: string): Promise<boolean> {
    return this.mockDelete();
  }
  update(id: string, card: Card): Promise<boolean> {
    return this.mockUpdate();
  }
}
