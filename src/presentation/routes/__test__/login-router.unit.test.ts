import {
  CreateCardInput,
  CreateCardOutput,
  CreateCardUseCase,
} from "../../../domain/usecases/create-card-usecase";
import {
  LoginInput,
  LoginOutput,
  LoginUseCase,
} from "../../../domain/usecases/login-usecase";
import { HttpRequest } from "../../contracts";
import { InvalidRequestError } from "../../errors";
import { CreateCardRouter } from "../create-card-router";
import { LoginRouter } from "../login-router";

type Sut = {
  sut: LoginRouter;
  useCase: MockUseCase;
};

export class MockUseCase implements LoginUseCase {
  mockExecute: Function = () => {};
  async execute(input: LoginInput): Promise<LoginOutput> {
    return this.mockExecute();
  }
}

const makeSut = (): Sut => {
  const useCase: MockUseCase = new MockUseCase();
  return {
    sut: new LoginRouter(useCase),
    useCase,
  };
};

describe("Login Router", () => {
  it("when body is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {};

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidRequestError("no body"));
  });

  it("when use case returns unauthorized should return 401", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        login: "any_login",
        lista: "any_senha",
      },
    };

    useCase.mockExecute = () => {
      return {
        unauthorized: true,
      };
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(401);
  });

  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        login: "any_login",
        lista: "any_senha",
      },
    };

    useCase.mockExecute = () => {
      throw new Error();
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it("when use case returns a token should return 200 with token", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        login: "any_login",
        senha: "any_senha",
      },
    };

    useCase.mockExecute = (): LoginOutput => {
      return {
        unauthorized: false,
        login: "any_login",
        token: "jwt_token",
      };
    };

    const httpResponse = await sut.route(httpRequest);

    expect("jwt_token").toEqual(httpResponse.body.token);
  });
});
