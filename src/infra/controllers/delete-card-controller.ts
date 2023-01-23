import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../../presentation/contracts";
import {
  expressRequestAdapter,
  expressResponse,
} from "../../presentation/adapters/express-adapter";
import { DeleteCardRouter } from "../../presentation/routes/delete-card-router";

export class DeleteCardController {
  constructor(private readonly deleteCardRouter: DeleteCardRouter) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const httpRequest: HttpRequest = expressRequestAdapter(request);
    const httpResponse: HttpResponse = await this.deleteCardRouter.route(
      httpRequest
    );
    return expressResponse(response, httpResponse);
  }
}
