import { FindAllCardOutput } from "../../../domain/usecases/find-all-cards-usecase";
import { FindCardOutput } from "../../../domain/usecases/find-card-usecase";
import { FindCardRouter } from "../../../presentation/routes/find-card-router";
import { MockFindCardUseCase } from "../../mocks/mock-find-card-usecase";

type Sut = {
  sut: FindCardRouter;
  useCase: MockFindCardUseCase;
};

const makeSut = (): Sut => {
  const useCase: MockFindCardUseCase = new MockFindCardUseCase();
  return {
    useCase,
    sut: new FindCardRouter(useCase),
  };
};

describe("Find Card Router", () => {
  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async () => {
      throw new Error();
    };

    const httpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(httpResponse.statusCode).toBe(500);
  });

  it("when query param id is invalid should return 400", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.route({
      queryParams: {
        id: "",
      },
    });

    expect(httpResponse.statusCode).toBe(400);
  });

  it("when query param is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.route({});

    expect(httpResponse.statusCode).toBe(400);
  });

  it("when use case returns a null card should return 404", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async (): Promise<FindCardOutput> => {
      return null;
    };

    const httpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(404).toEqual(httpResponse.statusCode);
  });

  it("when use case returns a card should return 200", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async (): Promise<FindCardOutput> => {
      return {
        conteudo: "any_conteudo",
        id: "any_uuidv4",
        lista: "any_lista",
        titulo: "any_titulo",
      };
    };

    const httpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(200).toBe(httpResponse.statusCode);
  });
});
