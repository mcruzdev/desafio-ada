import { Card } from "../../domain/entities/card";
import { CardRepository } from "../../domain/repositories/card-repository";

export class MockCardRepository implements CardRepository {
  mockFindById: Function = async () => {};
  mockUpdate: Function = async () => {};
  mockDelete: Function = async () => {};
  mockSave: Function = async () => {};
  mockFindAll: Function = async () => {};

  async save(card: Card): Promise<Card> {
    return await this.mockSave();
  }
  async findById(id: string): Promise<Card | null> {
    return this.mockFindById(id);
  }
  async findAll(): Promise<Card[]> {
    return this.mockFindAll();
  }
  async delete(id: string): Promise<boolean> {
    return this.mockDelete();
  }
  async update(id: string, card: Card): Promise<boolean> {
    return this.mockUpdate();
  }
}
