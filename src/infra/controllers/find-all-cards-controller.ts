import { Request, Response } from "express";
import { FindAllCardsUseCase } from "../../domain/usecases/find-all-cards-usecase";
import { HttpResponse } from "../../presentation/contracts";

export class FindAllCardsController {
  constructor(private readonly findAllCardsUseCase: FindAllCardsUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const output = await this.findAllCardsUseCase.execute();

    return response.status(200).json({
      statusCode: 200,
      body: output,
    });
  }
}
