import app from "../../../app";
import request from "supertest";

describe("Create Card Controller", () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      login: "admin",
      senha: "admin",
    });

    token = `Bearer ${response.body.token}`;
  });

  it("when the card is created should return 201", async () => {
    await request(app)
      .post("/cards")
      .set({ Authorization: token })
      .send({
        titulo: "titulo",
        conteudo: "# conteudo",
        lista: "lista",
      })
      .expect(201);
  });

  it("when the card is invalid should return 400", async () => {
    await request(app)
      .post("/cards")
      .set({ Authorization: token })
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(400);
  });

  it("when is not authorized should return 401", async () => {
    await request(app)
      .post("/cards")
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(401);
  });
});
