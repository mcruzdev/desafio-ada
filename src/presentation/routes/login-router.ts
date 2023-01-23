import { LoginUseCase } from "../../domain/usecases/login-usecase";
import { HttpRequest, HttpResponse, Router } from "../contracts";
import { InvalidRequestError } from "../errors";
import {
  badRequest,
  internalServerError,
  ok,
  unauthorized,
} from "../helpers/http-response";

export class LoginRouter implements Router {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async route(httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body) {
      return badRequest(new InvalidRequestError("no body"));
    }

    const { login, senha } = httpRequest.body;

    try {
      const output = await this.loginUseCase.execute({
        login,
        senha,
      });

      if (output.unauthorized) {
        return unauthorized();
      }

      return ok(output);
    } catch (err) {
      return internalServerError();
    }
  }
}
