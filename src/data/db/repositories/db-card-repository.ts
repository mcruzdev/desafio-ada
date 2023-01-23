import { v4 as uuidv4 } from "uuid";
import { Card } from "../../../domain/entities/card";
import { CardRepository } from "../../../domain/repositories/card-repository";
import CardModel from "../models/card";

const zeroAffectedRows: number = 0;

export class DbCardRepository implements CardRepository {
  async update(id: string, card: Card): Promise<boolean> {
    const result = await CardModel.update(
      {
        title: card.titulo,
        content: card.conteudo,
        listName: card.lista,
      },
      {
        where: { id },
      }
    );

    return result.length > zeroAffectedRows;
  }

  async delete(id: string): Promise<boolean> {
    const result = await CardModel.destroy({
      where: { id },
    });

    return result > zeroAffectedRows;
  }

  async save(card: Card): Promise<Card> {
    const result = await CardModel.create({
      id: uuidv4(),
      content: card.conteudo,
      title: card.titulo,
      listName: card.lista,
    });

    return {
      id: result.dataValues.id,
      conteudo: result.dataValues.content,
      lista: result.dataValues.listName,
      titulo: result.dataValues.title,
    };
  }

  async findById(id: string): Promise<Card | null> {
    const card = await CardModel.findByPk(id);

    if (card?.dataValues) {
      return {
        id: card.dataValues.id,
        titulo: card.dataValues.title,
        conteudo: card.dataValues.content,
        lista: card.dataValues.listName,
      };
    } else {
      return null;
    }
  }

  async findAll(): Promise<Card[]> {
    const all = await CardModel.findAll({});
    return all.map(mapping);
  }
}

const mapping = (values: any): Card => ({
  id: values.id,
  conteudo: values.content,
  lista: values.listName,
  titulo: values.title,
});
