import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { HttpResponse } from "../../presentation/contracts";
import {
  UpdateCardInput,
  UpdateCardUseCase,
} from "../../domain/usecases/update-card-usecase";

export class UpdateCardController {
  constructor(private readonly updateCardUseCase: UpdateCardUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const req = {
      id: request.params.id,
      ...request.body,
    };

    validate(req);

    if (validate.errors) {
      return response.status(400).json({
        statusCode: 400,
        body: validate.errors,
      });
    }

    const output = await this.updateCardUseCase.execute(req);

    if (!output.success) {
      return response.status(404).json({
        statusCode: 404,
        body: {
          message: `resource with id ${req.id} not found`,
        },
      });
    }
    return response.status(200).json({
      statusCode: 200,
      body: output.input,
    });
  }
}

const schema: JSONSchemaType<UpdateCardInput> = {
  type: "object",
  properties: {
    id: { type: "string", nullable: false },
    titulo: { type: "string", nullable: false, minLength: 3 },
    conteudo: { type: "string", nullable: false, minLength: 3 },
    lista: { type: "string", nullable: false, minLength: 3 },
  },
  required: ["conteudo", "titulo", "lista"],
  additionalProperties: false,
};

const ajv = new Ajv();

const validate = ajv.compile(schema);
