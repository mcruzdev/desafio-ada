import { MockCardRepository } from "../../../../__test__/mocks/mock-card-repository";
import { DeleteCard } from "../delete-card-usecase";

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
  it("when repository returns success true should return true", async () => {
    const { sut, repository } = makeSut();

    repository.mockDelete = () => true;

    const output = await sut.execute({
      id: "anny_uuidv4",
    });

    expect(output.success).toBeTruthy();
  });

  it("when repository returns success false should return false", async () => {
    const { sut, repository } = makeSut();

    repository.mockDelete = () => false;

    const output = await sut.execute({
      id: "anny_uuidv4",
    });

    expect(output.success).toBeFalsy();
  });
});
