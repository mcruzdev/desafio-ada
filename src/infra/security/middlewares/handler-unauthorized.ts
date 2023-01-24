import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { unauthorized } from "../../../presentation/helpers/http-response";

export const handleUnauthorizedMiddleware = (
  err: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err.name == "UnauthorizedError") {
    return unauthorized();
  }
};
