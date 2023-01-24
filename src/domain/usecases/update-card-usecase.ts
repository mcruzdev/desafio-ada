import { FieldError } from "../contracts/error";

export interface UpdateCardUseCase {
  execute(input: UpdateCardInput): Promise<UpdateCardOutput>;
}

export type UpdateCardInput = {
  id: string;
  conteudo: string;
  titulo: string;
  lista: string;
};

export type UpdateCardOutput = {
  input?: UpdateCardInput;
  success?: boolean;
  exists?: boolean;
  errors?: FieldError[];
};
