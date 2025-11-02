import { User } from "../models/userModels.js";
import type { loginDto, signUpDto } from "../dtos/request/userRequest.js";
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
      .status(200)
      .json(standardResponse(null, "Please use correct password", 400));
  }

  const existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) {
    return res.status(409).json({ message: "User already exist" });
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

export const loginUser = async (req: any, res: any) => {
  const { username, password }: loginDto = req.body;

  if (!username || !password) {
    return res
      .status(200)
      .json(standardResponse(null, "Invalid credentials", 401));
  }
};
