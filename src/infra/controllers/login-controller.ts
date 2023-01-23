import { Request, Response } from "express";

import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import { LoginRouter } from "../../presentation/routes/login-router";

export class LoginController {
  constructor(private readonly loginRouter: LoginRouter) {}
  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.loginRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
