import app from "../../../app";
import request from "supertest";

describe("Delete Card Controller", () => {
  let token: string;

  beforeAll(async () => {
    const response = await request(app).post("/login").send({
      login: process.env.LOGIN,
      senha: process.env.SENHA,
    });

    token = `Bearer ${response.body.token}`;
  });

  it("when the card is delete should return 204", async () => {
    const createResponse = await request(app)
      .post("/cards")
      .set({ Authorization: token })
      .send({
        titulo: "delete",
        conteudo: "# delete",
        lista: "delete",
      });

    await request(app)
      .delete(`/cards/${createResponse.body.id}`)
      .set({ Authorization: token })
      .expect(204);
  });

  it("when card does not exist should return 404", async () => {
    await request(app)
      .delete("/cards/367d44de-31de-496c-bf02-a634ecb148a6")
      .set({ Authorization: token })
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(404);
  });

  it("when is not authorized should return 401", async () => {
    await request(app)
      .delete("/cards/5c4fd17c-89cc-4949-b6d3-60a0b7e850aa")
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(401);
  });
});
