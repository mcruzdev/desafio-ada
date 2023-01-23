import { CreateCardUseCase } from "../../domain/usecases/create-card-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { InvalidRequestError } from "../errors";
import {
  badRequest,
  created,
  internalServerError,
} from "../helpers/http-response";

export class CreateCardRouter implements Router {
  constructor(private readonly createCardUseCase: CreateCardUseCase) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body) {
      return badRequest(new InvalidRequestError("no body"));
    }

    const { titulo, conteudo, lista } = httpRequest.body;

    try {
      const output = await this.createCardUseCase.execute({
        titulo,
        conteudo,
        lista,
      });

      if (output.errors.length) {
        return badRequest(output.errors);
      }

      return created(output);
    } catch (err) {
      return internalServerError();
    }
  }
}
