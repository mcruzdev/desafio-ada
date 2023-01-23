import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export const handleUnauthorizedMiddleware = (
  err: ErrorRequestHandler,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (err.name == "UnauthorizedError") {
    return response.status(401).json({
      statusCode: 401,
      body: {
        message: "unauthorized",
      },
    });
  }
};
