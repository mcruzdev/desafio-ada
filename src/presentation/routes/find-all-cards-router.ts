import { FindAllCardsUseCase } from "../../domain/usecases/find-all-cards-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { internalServerError, ok } from "../helpers/http-response";

export class FindAllCardsRouter implements Router {
  constructor(private readonly findAllCardsUseCase: FindAllCardsUseCase) {}

  async route(_: HttpRequest): Promise<HttpResponse> {
    try {
      const output = await this.findAllCardsUseCase.execute();
      return ok(output);
    } catch (err) {
      return internalServerError();
    }
  }
}
