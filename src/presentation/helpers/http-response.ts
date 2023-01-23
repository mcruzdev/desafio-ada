import { HttpResponse } from "../contracts";
import { InternalServerError, UnauthorizedError } from "../errors";

export const badRequest = (error: any): HttpResponse => {
  return {
    statusCode: 400,
    body: error,
  };
};

export const internalServerError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new InternalServerError(),
  };
};

export const unauthorized = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new UnauthorizedError(),
  };
};

export const ok = (body: any): HttpResponse => {
  return {
    statusCode: 200,
    body,
  };
};

export const created = (body: any): HttpResponse => {
  return {
    statusCode: 201,
    body,
  };
};
