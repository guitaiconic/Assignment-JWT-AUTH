import JWT from "jsonwebtoken";
import dotenv from "dotenv";
import { standardResponse } from "../response/standardResponse.js";
import { User } from "../models/userModels.js";
import type { NextFunction } from "express";

dotenv.config();

//Middleware to generate Token
export const generateToken = (id: String) => {
  const token = JWT.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: "2d",
  });
  return token;
};

//Middlewares to proctect routes

export const protect = async (req: any, res: any, next: NextFunction) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  console.log(token);

  if (!token) {
    return (res as any)
      .status(401)
      .json(
        standardResponse(
          null,
          "You are not logged in! Please log in to get access",
          401
        )
      );
  }

  console.log("Extracted Token:", token);

  //Verify token
  const decoded = JWT.verify(token, process.env.JWT_SECRET as string) as {
    id: string;
  };

  console.log("Decoded:", decoded);

  const currentUser = await User.findById(decoded.id);

  console.log("Found User:", currentUser);

  if (!currentUser) {
    return (res as any)
      .status(401)
      .json(
        standardResponse(
          null,
          "The user belonging to this token no longer exists",
          401
        )
      );
  }

  req.user = currentUser;

  return next();
};
