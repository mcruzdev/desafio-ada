import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import {
  FindCardInput,
  FindCardUseCase,
} from "../../domain/usecases/find-card-usecase";
import { HttpResponse } from "../../presentation/contracts";

export class FindCardController {
  constructor(private readonly findCardUseCase: FindCardUseCase) {}

  async handle(
    request: Request,
    response: Response
  ): Promise<Response<HttpResponse>> {
    const id: string = request.params.id;

    validate({ id });

    if (validate.errors) {
      return response.status(400).json({
        statusCode: 400,
        body: validate.errors,
      });
    }

    const output = await this.findCardUseCase.execute({
      id,
    });

    if (!output) {
      return response.status(404).json({
        statusCode: 404,
        body: {
          message: `resource with id ${id} not found`,
        },
      });
    }

    return response.status(200).json({
      statusCode: 200,
      body: output,
    });
  }
}

const schema: JSONSchemaType<FindCardInput> = {
  type: "object",
  properties: {
    id: { type: "string", nullable: false },
  },
  required: ["id"],
  additionalProperties: false,
};

const ajv = new Ajv();

const validate = ajv.compile(schema);
