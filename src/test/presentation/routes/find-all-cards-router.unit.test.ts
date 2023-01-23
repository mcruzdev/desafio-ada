import { FindAllCardOutput } from "../../../domain/usecases/find-all-cards-usecase";
import { FindAllCardsRouter } from "../../../presentation/routes/find-all-cards-router";
import { MockFindAllCardsUseCase } from "../../mocks/mock-find-all-cards-usecase";

type Sut = {
  sut: FindAllCardsRouter;
  useCase: MockFindAllCardsUseCase;
};

const makeSut = (): Sut => {
  const useCase: MockFindAllCardsUseCase = new MockFindAllCardsUseCase();
  return {
    useCase,
    sut: new FindAllCardsRouter(useCase),
  };
};

describe("Findl All Cards Router", () => {
  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async () => {
      throw new Error();
    };

    const httpResponse = await sut.route({});

    expect(httpResponse.statusCode).toBe(500);
  });

  it("when use case returns all cards should return 200", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async (): Promise<FindAllCardOutput> => {
      return [
        {
          conteudo: "any_conteudo",
          id: "any_uuidv4",
          lista: "any_lista",
          titulo: "any_titulo",
        },
      ];
    };

    const httpResponse = await sut.route({});

    expect(1).toEqual(httpResponse.body.length);
  });

  it("when use case returns 0 cards should return 200", async () => {
    const { sut, useCase } = makeSut();

    useCase.mockExecute = async (): Promise<FindAllCardOutput> => {
      return [];
    };

    const httpResponse = await sut.route({});

    expect(0).toEqual(httpResponse.body.length);
  });
});
