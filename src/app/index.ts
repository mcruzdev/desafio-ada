import dotenv from "dotenv";
dotenv.config({
  path: process.env.ENV_FILE,
});

import express, { Request, Response } from "express";
import * as expressJwt from "express-jwt";
import cors from "cors";

import database from "../config/sequelize/database";
(async () => {
  try {
    await database.sync();
  } catch (error) {}
})();

import { makeCreateCardController } from "../main/factories/controllers/create-card-controller-factory";
import { makeDeleteCardController } from "../main/factories/controllers/delete-card-controller-factory";
import { makeFindAllCardsController } from "../main/factories/controllers/find-all-cards-controller-factory";
import { makeFindCardController } from "../main/factories/controllers/find-card-controller-factory";
import { makeUpdateCardController } from "../main/factories/controllers/update-card-controller-factory";
import { handleUnauthorizedMiddleware } from "../infra/security/middlewares/handler-unauthorized";
import { makeLoginController } from "../main/factories/controllers/login-controller-factory";

const app = express();

app.use(express.json());
app.use(cors());

const createCardController = makeCreateCardController();
const findCardController = makeFindCardController();
const findAllCardsUseCase = makeFindAllCardsController();
const deleteCardController = makeDeleteCardController();
const updateCardController = makeUpdateCardController();
const loginController = makeLoginController();

app.use(
  expressJwt
    .expressjwt({
      secret: process.env.JWT_TOKEN as string,
      algorithms: ["HS256"],
      getToken: (request: Request) => {
        if (
          request.headers.authorization &&
          request.headers.authorization.split(" ")[0] === "Bearer"
        ) {
          return request.headers.authorization.split(" ")[1];
        } else {
          null;
        }
      },
    })
    .unless({
      path: ["/login"],
    })
);

app.use(handleUnauthorizedMiddleware);

app.post(
  "/login",
  async (request: Request, response: Response) =>
    await loginController.handle(request, response)
);

app.post(
  "/cards",
  async (request: Request, response: Response) =>
    await createCardController.handle(request, response)
);

app.get(
  "/cards/:id",
  async (request: Request, response: Response) =>
    await findCardController.handle(request, response)
);

app.get(
  "/cards",
  async (request: Request, response: Response) =>
    await findAllCardsUseCase.handle(request, response)
);

app.delete(
  "/cards/:id",
  async (request: Request, response: Response) =>
    await deleteCardController.handle(request, response)
);

app.put(
  "/cards/:id",
  async (request: Request, response: Response) =>
    await updateCardController.handle(request, response)
);

export default app;
