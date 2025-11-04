import JWT from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const generateToken = (id: string) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
  return token;
};
