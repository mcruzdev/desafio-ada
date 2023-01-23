import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { FindCardRouter } from "../../presentation/routes/find-card-router";

export class FindCardController {
  constructor(private readonly findCardRouter: FindCardRouter) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.findCardRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
