import { User } from "../models/userModels.js";
import type { signUpDto } from "../dtos/request/userRequest.js";
import { standardResponse } from "../response/standardResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";

//Creating Users signUp

export const signUp = catchAsync(async (req: any, res: any) => {
  const { firstName, lastName, username, password, email }: signUpDto =
    req.body;
  console.log(req.body);
  if (!email || !password || !firstName || !lastName || !username) {
    return res
      .status(500)
      .json(standardResponse(null, "All field are required", 400));
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!emailRegex.test(email)) {
    return res
      .status(400)
      .json(standardResponse(null, "Please use correct email", 400));
  }

  if (!passwordRegex.test(password)) {
    return res
      .status(400)
      .json(standardResponse(null, "Please use correct password", 400));
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    username,
    password: hashPassword,
    email,
  });

  return res
    .status(201)
    .json(standardResponse(newUser, "User created successfully", 201));
});
