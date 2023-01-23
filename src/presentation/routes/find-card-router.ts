import { FindAllCardsUseCase } from "../../domain/usecases/find-all-cards-usecase";
import { FindCardUseCase } from "../../domain/usecases/find-card-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { InvalidParamError, InvalidRequestError } from "../errors";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from "../helpers/http-response";

export class FindCardRouter implements Router {
  constructor(private readonly findCardUseCase: FindCardUseCase) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.queryParams) {
        return badRequest(new InvalidRequestError("no query params"));
      }

      if (!httpRequest.queryParams.id) {
        return badRequest(new InvalidParamError("id"));
      }
      const { id } = httpRequest.queryParams;
      const output = await this.findCardUseCase.execute({
        id,
      });

      if (!output) {
        return notFound("resource not found");
      }
      return ok(output);
    } catch (err) {
      return internalServerError();
    }
  }
}
