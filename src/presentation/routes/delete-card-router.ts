import { DeleteCardUseCase } from "../../domain/usecases/delete-card-usecase";
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
    try {
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
      }

      return internalServerError();
    } catch (err) {
      return internalServerError();
    }
  }
}
