import { MockCardRepository } from "../../../../__test__/mocks/mock-card-repository";
import { CreateCard } from "../create-card-usecase";

type Sut = {
  sut: CreateCard;
  repository: MockCardRepository;
};

const makeSut = (): Sut => {
  const repository = new MockCardRepository();
  const sut = new CreateCard(repository);
  return {
    sut,
    repository,
  };
};
describe("Create Card Use Case", () => {
  it("when lista is invalid should return errors", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "any_conteudo",
      lista: "",
      titulo: "any_titulo",
    });

    expect(1).toBe(output.errors.length);
  });

  it("when conteudo is invalid should return error", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "",
      lista: "any_lista",
      titulo: "any_titulo",
    });

    expect(1).toBe(output.errors.length);
  });

  it("when titulo is invalid should return error", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "any_conteudo",
      lista: "any_lista",
      titulo: "",
    });

    expect(1).toBe(output.errors.length);
  });

  it("when all fields are invalid should return 4 errors", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "",
      lista: "",
      titulo: "",
    });

    expect(3).toBe(output.errors?.length);
  });

  it("when the repository creates the card should return success the card", async () => {
    const { sut, repository } = makeSut();

    const input = {
      conteudo: "any_conteudo_new",
      id: "any_uuidv4_new",
      lista: "any_lista_new",
      titulo: "any_titulo_new",
    };

    repository.mockSave = () => ({
      ...input,
      id: "any_uuidv4_new",
    });

    repository.mockUpdate = () => true;

    const output = await sut.execute(input);

    expect(output.id).not.toBeNull();
  });
});
