import app from "../../../app";
import request from "supertest";

describe("Find all cards controller", () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      login: "admin",
      senha: "admin",
    });
    token = `Bearer ${response.body.token}`;
  });

  it("when there are cards should return 200", async () => {
    await request(app).post("/cards").set({ Authorization: token }).send({
      titulo: "titulo 1",
      conteudo: "# conteudo 1",
      lista: "lista 1",
    });

    await request(app).post("/cards").set({ Authorization: token }).send({
      titulo: "titulo 2",
      conteudo: "# conteudo 2",
      lista: "lista 2",
    });

    await request(app).get("/cards").set({ Authorization: token }).expect(200);
  });

  it("when is not authorized should return 401", async () => {
    await request(app)
      .get("/cards")
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(401);
  });
});
