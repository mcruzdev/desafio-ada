export interface FindCardUseCase {
  execute(input: FindCardInput): Promise<FindCardOutput>;
}

export type FindCardInput = {
  id: string;
};

export type FindCardOutput = {
  id: string;
  titulo: string;
  conteudo: string;
  lista: string;
} | null;
