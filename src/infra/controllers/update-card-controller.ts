import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { UpdateCardRouter } from "../../presentation/routes/update-card-router";

export class UpdateCardController {
  constructor(private readonly updateCardRouter: UpdateCardRouter) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.updateCardRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
