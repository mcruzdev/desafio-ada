import { Card } from "../../../../domain/entities/card";
import { FindCard } from "../../../../domain/usecases/impl/find-card-usecase";
import { MockCardRepository } from "../../../../test/mocks/mock-card-repository";

type Sut = {
  sut: FindCard;
  repository: MockCardRepository;
};

const makeSut = (): Sut => {
  const repository = new MockCardRepository();
  const sut = new FindCard(repository);
  return {
    sut,
    repository,
  };
};

describe("Find Card Use Case", () => {
  it("when card does not exist should return found false", async () => {
    const { sut, repository } = makeSut();

    let idSpy: string = "";

    repository.mockFindById = async (id: string): Promise<Card | null> => {
      idSpy = id;
      return null;
    };

    const output = await sut.execute({
      id: "any_uuidv4",
    });

    expect(idSpy).toBe("any_uuidv4");
    expect(output).toBeNull();
  });
});
