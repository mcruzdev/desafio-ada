import { Request, Response } from "express";
import Ajv, { JSONSchemaType } from "ajv";
import { DeleteCardUseCase } from "../../domain/usecases/delete-card-usecase";
import { HttpResponse } from "../../presentation/contracts";
import { FindCardInput } from "../../domain/usecases/find-card-usecase";

export class DeleteCardController {
  constructor(private readonly deleteCardUseCase: DeleteCardUseCase) {}

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

    const output = await this.deleteCardUseCase.execute({
      id: id,
    });

    if (!output.success) {
      return response.status(404).json({
        statusCode: 400,
        body: {
          message: `resource with id ${request.params.id} not found`,
        },
      });
    }

    return response.status(204).json({
      statusCode: 204,
      body: {},
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
