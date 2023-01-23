export interface DeleteCardUseCase {
  execute(input: DeleteCardInput): Promise<DeleteCardOutput>;
}

export type DeleteCardInput = { id: string };

export type DeleteCardOutput = { success: boolean; exists: boolean };
