import { CreateCardOutput } from "../../../domain/usecases/create-card-usecase";
import { FindCardOutput } from "../../../domain/usecases/find-card-usecase";
import { UpdateCardOutput } from "../../../domain/usecases/update-card-usecase";
import { HttpRequest } from "../../../presentation/contracts";
import { InvalidRequestError } from "../../../presentation/errors";
import { UpdateCardRouter } from "../../../presentation/routes/update-card-router";
import { MockCreateCardUseCase } from "../../mocks/mock-create-card-usecase";

type Sut = {
  sut: UpdateCardRouter;
  useCase: MockCreateCardUseCase;
};

const makeSut = (): Sut => {
  const useCase: MockCreateCardUseCase = new MockCreateCardUseCase();
  return {
    sut: new UpdateCardRouter(useCase),
    useCase,
  };
};

describe("Update Card Router", () => {
  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        conteudo: "any_conteudo",
        titulo: "any_titulo",
        lista: "any_lista",
      },
      queryParams: {
        id: "any_uuidv4",
      },
    };

    useCase.mockExecute = async () => {
      throw new Error();
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  it("when body is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {};

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidRequestError("no body"));
  });

  it("when query params is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpRequest: HttpRequest = {
      body: {},
    };

    const httpResponse = await sut.route(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(
      new InvalidRequestError("no query params")
    );
  });

  it("when card does not exist should return 404", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {},
      queryParams: {
        id: "invalid_uuidv4",
      },
    };

    useCase.mockExecute = async (): Promise<UpdateCardOutput> => {
      return {
        exists: false,
        success: false,
        errors: [],
      };
    };

    const output = await sut.route(httpRequest);

    expect(404).toBe(output.statusCode);
  });

  it("when use case returns erros should return 400", async () => {
    const { sut, useCase } = makeSut();

    const httpRequest: HttpRequest = {
      body: {
        conteudo: "any_conteudo",
        lista: "any_lista",
      },
      queryParams: {
        id: "any_uuidv4",
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

    expect(400).toBe(httpResponse.statusCode);
    expect(1).toBe(httpResponse.body.length);
  });

  it("when use case returns a card without errors should return 200", async () => {
    const { sut, useCase } = makeSut();

    const input = {
      conteudo: "any_conteudo",
      lista: "any_lista",
      titulo: "any_titulo",
    };

    const httpRequest: HttpRequest = {
      body: {
        ...input,
      },
      queryParams: {
        id: "any_uuidv4",
      },
    };

    useCase.mockExecute = async (): Promise<UpdateCardOutput> => {
      return {
        exists: true,
        success: true,
        errors: [],
        input: {
          id: "any_uuidv4",
          ...input,
        },
      };
    };

    const httpResponse = await sut.route(httpRequest);

    expect("any_uuidv4").toEqual(httpResponse.body.id);
    expect(200).toBe(httpResponse.statusCode);
  });
});
