import { StringValidator } from "../../helpers/string-validator";
import { FieldError } from "../contracts/error";

export interface Card {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: string;
}

export type ValidateOptions = {
  card: Card;
  validateId: boolean;
};

export const validateCard = ({
  card,
  validateId: checkId,
}: ValidateOptions): FieldError[] => {
  const errors: FieldError[] = [];

  if (checkId && StringValidator.isNullOrEmpty(card.id)) {
    errors.push({
      name: "id",
      message: "invalid",
    });
  }

  if (StringValidator.isNullOrEmpty(card.conteudo)) {
    errors.push({
      name: "conteudo",
      message: "invalid",
    });
  }

  if (StringValidator.isNullOrEmpty(card.lista)) {
    errors.push({
      name: "lista",
      message: "invalid",
    });
  }

  if (StringValidator.isNullOrEmpty(card.titulo)) {
    errors.push({
      name: "titulo",
      message: "invalid",
    });
  }

  return errors;
};
