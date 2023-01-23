import { Login } from "../../../../domain/usecases/impl/login-usecase";

type Sut = {
  sut: Login;
};

const makeSut = (): Sut => {
  const sut = new Login();
  return {
    sut,
  };
};

describe("Login Use Case", () => {
  beforeEach(() => {
    process.env.JWT_TOKEN = "any_token";
    process.env.LOGIN = "any_login";
    process.env.SENHA = "any_senha";
  });

  it("when credentials are correct should return unauthorized false", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      login: "any_login",
      senha: "any_senha",
    });

    expect(output.unauthorized).toBeFalsy();
  });

  it("when credentials are incorrect should return unauthorized true", async () => {
    const { sut } = makeSut();

    const output = await sut.execute({
      login: "invalid_login",
      senha: "invalid_senha",
    });

    expect(output.unauthorized).toBeTruthy();
  });
});
