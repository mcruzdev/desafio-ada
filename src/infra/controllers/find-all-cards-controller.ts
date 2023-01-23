import { Request, Response } from "express";
import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import { FindAllCardsRouter } from "../../presentation/routes/find-all-cards-router";

export class FindAllCardsController {
  constructor(private readonly findAllCardsRouter: FindAllCardsRouter) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.findAllCardsRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
