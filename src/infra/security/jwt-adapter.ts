import jwt from "jsonwebtoken";

export class JwtAdapter {
  static generateToken(login: string): string {
    const token = jwt.sign(
      {
        login,
      },
      process.env.JWT_TOKEN as string
    );

    return token;
  }
}
