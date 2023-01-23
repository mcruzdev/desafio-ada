import { CreateCardOutput } from "../../../domain/usecases/create-card-usecase";
import { HttpRequest } from "../../../presentation/contracts";
import { InvalidRequestError } from "../../../presentation/errors";
import { CreateCardRouter } from "../../../presentation/routes/create-card-router";
import { MockLoginUseCase } from "../../mocks/mock-login-usecase";

type Sut = {
  sut: CreateCardRouter;
  useCase: MockLoginUseCase;
};

const makeSut = (): Sut => {
  const useCase: MockLoginUseCase = new MockLoginUseCase();
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

    useCase.mockExecute = async () => {
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

    useCase.mockExecute = async () => {
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

    useCase.mockExecute = async (): Promise<CreateCardOutput> => {
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
