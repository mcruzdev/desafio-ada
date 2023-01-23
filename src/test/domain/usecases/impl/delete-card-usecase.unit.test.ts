import { DeleteCard } from "../../../../domain/usecases/impl/delete-card-usecase";
import { MockCardRepository } from "../../../../test/mocks/mock-card-repository";

type Sut = {
  sut: DeleteCard;
  repository: MockCardRepository;
};

const makeSut = (): Sut => {
  const repository = new MockCardRepository();
  const sut = new DeleteCard(repository);
  return {
    sut,
    repository,
  };
};

describe("Delete Card Use Case", () => {
  it("when card does not exist should return exists false", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindById = async () => {
      return null;
    };

    const output = await sut.execute({
      id: "any_uuidv4",
    });

    expect(output.exists).toBeFalsy();
  });

  it("when repository returns success true should return true", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindById = async (): Promise<any> => ({
      id: "any_uuidv4",
    });

    repository.mockDelete = async () => true;

    const output = await sut.execute({
      id: "anny_uuidv4",
    });

    expect(output.success).toBeTruthy();
  });

  it("when repository returns success false should return false", async () => {
    const { sut, repository } = makeSut();

    repository.mockDelete = async () => false;

    const output = await sut.execute({
      id: "anny_uuidv4",
    });

    expect(output.success).toBeFalsy();
  });
});
