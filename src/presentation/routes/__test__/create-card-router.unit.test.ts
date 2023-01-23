import {
  CreateCardInput,
  CreateCardOutput,
  CreateCardUseCase,
} from "../../../domain/usecases/create-card-usecase";
import { HttpRequest } from "../../contracts";
import { InvalidRequestError } from "../../errors";
import { CreateCardRouter } from "../create-card-router";

type Sut = {
  sut: CreateCardRouter;
  useCase: MockUseCase;
};

export class MockUseCase implements CreateCardUseCase {
  mockExecute: Function = () => {};
  async execute(input: CreateCardInput): Promise<CreateCardOutput> {
    return this.mockExecute();
  }
}

const makeSut = (): Sut => {
  const useCase: MockUseCase = new MockUseCase();
  return {
    sut: new CreateCardRouter(useCase),
    useCase,
  };
};

describe("Create Card Router", () => {
  it("when body is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {};

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidRequestError("no body"));
  });

  it("when use case returns errros should return 400", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        conteudo: "any_conteudo",
        lista: "any_lista",
      },
    };

    useCase.mockExecute = () => {
      return {
        errors: [
          {
            name: "titulo",
            message: "invalid",
          },
        ],
      };
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect("titulo").toEqual(httpResponse.body[0].name);
    expect("invalid").toEqual(httpResponse.body[0].message);
  });

  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        conteudo: "any_conteudo",
        lista: "any_lista",
      },
    };

    useCase.mockExecute = () => {
      throw new Error();
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it("when use case returns a card without errors should return 201", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        conteudo: "any_conteudo",
        lista: "any_lista",
        titulo: "any_titulo",
      },
    };

    useCase.mockExecute = (): CreateCardOutput => {
      return {
        conteudo: "any_conteudo",
        id: "any_uuidv4",
        lista: "any_lista",
        titulo: "any_titulo",
        errors: [],
      };
    };

    const httpResponse = await sut.route(httpRequest);

    expect("any_uuidv4").toEqual(httpResponse.body.id);
  });
});
