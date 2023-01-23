export class InvalidParamError extends Error {
  constructor(paramName: string) {
    super(`invalid param: ${paramName}`);
    this.name = "InvalidParamError";
  }
}

export class InvalidRequestError extends Error {
  constructor(message: string) {
    super(`invalid request: ${message}`);
    this.name = "InvalidRequestError";
  }
}

export class InternalServerError extends Error {
  constructor() {
    super("internal server error");
    this.name = "InternalServerError";
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super("unauthorized");
    this.name = "UnauthorizedError";
  }
}
