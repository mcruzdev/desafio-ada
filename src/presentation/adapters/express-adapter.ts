import { Request, Response } from "express";
import { HttpRequest, HttpResponse } from "../contracts";

export const expressRequestAdapter = (request: Request): HttpRequest => {
  return {
    body: request.body,
    queryParams: request.params,
  };
};

export const expressResponse = (
  response: Response,
  httpResponse: HttpResponse
): Response => {
  return response.status(httpResponse.statusCode).json(httpResponse.body);
};
