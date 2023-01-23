import { MockCardRepository } from "../../../../__test__/mocks/mock-card-repository";
import { Card } from "../../../entities/card";
import { FindCard } from "../find-card-usecase";

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

    repository.mockFindById = (id: string): Card | null => {
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
