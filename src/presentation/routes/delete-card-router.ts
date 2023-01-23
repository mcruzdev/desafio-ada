import { DeleteCardUseCase } from "../../domain/usecases/delete-card-usecase";
import { DeleteCard } from "../../domain/usecases/impl/delete-card-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { InvalidRequestError } from "../errors";
import {
  badRequest,
  internalServerError,
  noContent,
  notFound,
} from "../helpers/http-response";

export class DeleteCardRouter implements Router {
  constructor(private readonly deleteCardUseCase: DeleteCardUseCase) {}
  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.queryParams) {
      return badRequest(new InvalidRequestError("no query params"));
    }

    const id = httpRequest.queryParams.id;

    const output = await this.deleteCardUseCase.execute({
      id,
    });

    if (!output.exists) {
      return notFound("resource not found");
    }

    if (output.success) {
      return noContent();
    } else {
      return internalServerError();
    }
  }
}
