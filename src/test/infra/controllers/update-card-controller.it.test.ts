import app from "../../../app";
import request from "supertest";

describe("Update Card Controller", () => {
  it("when is not authorized should return 401", async () => {
    await request(app)
      .put("/cards/a2fc0e5f-ed75-4c18-becf-4f4b85923a4b")
      .send({
        titulo: "",
        conteudo: "",
        lista: "",
      })
      .expect(401);
  });
});
