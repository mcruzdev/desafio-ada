export interface LoginUseCase {
  execute(input: LoginInput): Promise<LoginOutput>;
}

export type LoginInput = {
  login: string;
  senha: string;
};

export type LoginOutput = {
  login?: string;
  token?: string;
  unauthorized: boolean;
};
