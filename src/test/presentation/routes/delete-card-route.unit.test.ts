import { DeleteCardOutput } from "../../../domain/usecases/delete-card-usecase";
import { HttpResponse } from "../../../presentation/contracts";
import { InvalidRequestError } from "../../../presentation/errors";
import { DeleteCardRouter } from "../../../presentation/routes/delete-card-router";
import { MockDeleteCardUseCase } from "../../mocks/mock-delete-card-usecase";

type Sut = {
  sut: DeleteCardRouter;
  useCase: MockDeleteCardUseCase;
};

const makeSut = (): Sut => {
  const useCase: MockDeleteCardUseCase = new MockDeleteCardUseCase();
  return {
    sut: new DeleteCardRouter(useCase),
    useCase,
  };
};

describe("Delete Card Router", () => {
  it("when query param id is not provided should return 400", async () => {
    const { sut } = makeSut();

    const httpResponse: HttpResponse = await sut.route({});

    expect(400).toBe(httpResponse.statusCode);
    expect(new InvalidRequestError("no query params")).toEqual(
      httpResponse.body
    );
  });

  it("when use case returns success as true should returns 204", async () => {
    const { sut, useCase } = makeSut();

    useCase.execute = async (): Promise<DeleteCardOutput> => ({
      exists: true,
      success: true,
    });

    const httpResponse: HttpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(204).toBe(httpResponse.statusCode);
  });

  it("when use case returns exists as false should returns 404", async () => {
    const { sut, useCase } = makeSut();

    useCase.execute = async (): Promise<DeleteCardOutput> => ({
      exists: false,
      success: false,
    });

    const httpResponse: HttpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(404).toBe(httpResponse.statusCode);
  });

  it("when use case throws should return 500", async () => {
    const { sut, useCase } = makeSut();

    useCase.execute = async (): Promise<DeleteCardOutput> => {
      throw new Error();
    };

    const httpResponse: HttpResponse = await sut.route({
      queryParams: {
        id: "any_uuidv4",
      },
    });

    expect(500).toBe(httpResponse.statusCode);
  });
});
