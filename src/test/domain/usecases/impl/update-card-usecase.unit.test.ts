import { UpdateCard } from "../../../../domain/usecases/impl/update-card-usecase";
import { MockCardRepository } from "../../../../test/mocks/mock-card-repository";

type Sut = {
  sut: UpdateCard;
  repository: MockCardRepository;
};

const makeSut = (): Sut => {
  const repository = new MockCardRepository();
  const sut = new UpdateCard(repository);
  return {
    sut,
    repository,
  };
};

describe("Update Card Use Case", () => {
  it("when lista is invalid should return errors", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "any_conteudo",
      id: "any_uuidv4",
      lista: "",
      titulo: "any_titulo",
    });

    expect(1).toBe(output.errors?.length);
  });

  it("when conteudo is invalid should return error", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "",
      id: "any_uuidv4",
      lista: "any_lista",
      titulo: "any_titulo",
    });

    expect(1).toBe(output.errors?.length);
  });

  it("when titulo is invalid should return error", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "any_conteudo",
      id: "any_uuidv4",
      lista: "any_lista",
      titulo: "",
    });

    expect(1).toBe(output.errors?.length);
  });

  it("when id is invalid should return error", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "any_conteudo",
      id: "",
      lista: "any_lista",
      titulo: "any_titulo",
    });

    expect(1).toBe(output.errors?.length);
  });

  it("when all fields are invalid should return 4 errors", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      conteudo: "",
      id: "",
      lista: "",
      titulo: "",
    });

    expect(4).toBe(output.errors?.length);
  });

  it("when the repository does not find the card should return not found true", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindById = async () => null;

    const output = await sut.execute({
      conteudo: "any_conteudo",
      id: "any_uuidv4",
      lista: "any_lista",
      titulo: "any_titulo",
    });

    expect(false).toBe(output.exists);
  });

  it("when the repository updates the card should return success true", async () => {
    const { sut, repository } = makeSut();

    repository.mockFindById = async () => ({
      id: "any_uuidv4",
      conteudo: "any_conteudo",
      lista: "any_lista",
      titulo: "any_titulo",
    });

    const input = {
      conteudo: "any_conteudo_new",
      id: "any_uuidv4_new",
      lista: "any_lista_new",
      titulo: "any_titulo_new",
    };

    repository.mockUpdate = async () => true;

    const output = await sut.execute(input);

    expect(true).toBe(output.exists);
    expect(true).toBe(output.success);
  });
});
