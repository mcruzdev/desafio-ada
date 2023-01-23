import { Login } from "../../../domain/usecases/impl/login-usecase";
import { LoginController } from "../../../infra/controllers/login-controller";
import { LoginRouter } from "../../../presentation/routes/login-router";

export const makeLoginController = (): LoginController => {
  const loginUseCase = new Login();
  const loginRouter = new LoginRouter(loginUseCase);
  return new LoginController(loginRouter);
};
