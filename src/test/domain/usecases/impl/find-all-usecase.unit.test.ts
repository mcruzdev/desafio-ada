import { Card } from "../../../../domain/entities/card";
import { FindAllCards } from "../../../../domain/usecases/impl/find-all-cards-usecase";
import { MockCardRepository } from "../../../../test/mocks/mock-card-repository";

type Sut = {
  sut: FindAllCards;
  repository: MockCardRepository;
};

const makeSut = (): Sut => {
  const repository = new MockCardRepository();
  const sut = new FindAllCards(repository);
  return {
    sut,
    repository,
  };
};

describe("Find All Cards Use Case", () => {
  it("when repository returns success true should return true", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindAll = async (): Promise<Card[]> => [
      {
        conteudo: "any_conteudo",
        lista: "any_lista",
        titulo: "any_titulo",
        id: "any_uuidv4",
      },
    ];

    const output = await sut.execute();

    expect(output.length).toBe(1);
  });

  it("when repository returns success false should return false", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindAll = async () => [];

    const output = await sut.execute();

    expect(output.length).toBe(0);
  });
});
