import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { CreateCardInput } from "../../domain/usecases/create-card-usecase";
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

const schema: JSONSchemaType<CreateCardInput> = {
  type: "object",
  properties: {
    titulo: { type: "string", nullable: false, minLength: 3 },
    conteudo: { type: "string", nullable: false, minLength: 3 },
    lista: { type: "string", nullable: false, minLength: 3 },
  },
  required: ["conteudo", "titulo", "lista"],
  additionalProperties: false,
};

const ajv = new Ajv();

const validate = ajv.compile(schema);
