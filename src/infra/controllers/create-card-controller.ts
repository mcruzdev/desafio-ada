import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { CreateCardRouter } from "../../presentation/routes/create-card-router";

export class CreateCardController {
  constructor(private readonly createCardRouter: CreateCardRouter) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.createCardRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
