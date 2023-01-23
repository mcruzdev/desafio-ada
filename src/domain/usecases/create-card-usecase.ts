import { FieldError } from "../contracts/error";

export interface CreateCardUseCase {
  execute(input: CreateCardInput): Promise<CreateCardOutput>;
}

export type CreateCardInput = {
  titulo: string;
  conteudo: string;
  lista: string;
};

export type CreateCardOutput = {
  id?: string;
  titulo: string;
  conteudo: string;
  lista: string;
  errors: FieldError[];
};
