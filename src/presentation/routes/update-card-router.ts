import { UpdateCardUseCase } from "../../domain/usecases/update-card-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { InvalidRequestError } from "../errors";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
} from "../helpers/http-response";

export class UpdateCardRouter implements Router {
  constructor(private readonly updateCardUseCase: UpdateCardUseCase) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body) {
      return badRequest(new InvalidRequestError("no body"));
    }

    if (!httpRequest.queryParams) {
      return badRequest(new InvalidRequestError("no query params"));
    }

    const { titulo, conteudo, lista } = httpRequest.body;

    const { id } = httpRequest.queryParams;

    try {
      const output = await this.updateCardUseCase.execute({
        id,
        titulo,
        conteudo,
        lista,
      });

      if (output.errors?.length) {
        return badRequest(output.errors);
      }

      if (!output.exists) {
        return notFound({
          message: "resource not found",
        });
      }

      return ok(output.input);
    } catch (err) {
      return internalServerError();
    }
  }
}
