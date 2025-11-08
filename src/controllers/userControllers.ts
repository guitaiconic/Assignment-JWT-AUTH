import { User } from "../models/userModels.js";
import type { loginDto, signUpDto } from "../dtos/request/userRequest.js";
import { standardResponse } from "../response/standardResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import bcrypt from "bcrypt";
import { generateToken } from "../middlewares/authMiddleware.js";

//Creating Users signUp
export const signUp = catchAsync(async (req: any, res: any) => {
  const { firstName, lastName, username, password, email }: signUpDto =
    req.body;

  if (!email || !password || !firstName || !lastName || !username) {
    return res
      .status(400)
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

  //Check for existing User
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

//Login User
export const login = catchAsync(async (req: any, res: any) => {
  const { email, password }: loginDto = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json(standardResponse(null, "Invalid credentials", 401));
  }

  // STAGE 3: Find user in database by username
  const user = await User.findOne({ email });
  console.log(user);

  // STAGE 4: Check if user exists
  if (!user) {
    return res
      .status(401)
      .json(standardResponse(null, "invalid credentials", 401));
  }

  // STAGE 5: Verify password using bcrypt
  const isPasswordValid = await bcrypt.compare(password, user.password);

  // STAGE 6: Check if password is correct
  if (!isPasswordValid) {
    return res
      .status(401)
      .json(standardResponse(null, "invalid credentials", 401));
  }

  // STAGE 7: Generate JWT token for authenticated user
  const token = generateToken(String(user._id));

  // STAGE 8: Return success response with token

  res.status(200).json(
    standardResponse(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token,
      },
      "Login was successful",
      200
    )
  );
});

//Creating a Profile page

export const profile = catchAsync(async (req: any, res: any) => {
  const user = req.user;

  if (!user) {
    return res
      .status(404)
      .json(standardResponse(null, "User profile doesn't exist", 404));
  }

  res.status(200).json(
    standardResponse(
      {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        createdAt: user.createdAt,
      },
      "Profile retrieve successfully",
      200
    )
  );
});

export const getAllUsers = catchAsync(async (req: any, res: any) => {
  // Fetch ALL users from database - NOT req.user
  const users = await User.find();

  console.log("Total users found:", users.length); // Add this
  console.log("Users:", users);

  res.status(200).json(
    standardResponse(
      {
        count: users.length,
        users: users.map((user) => ({
          id: String(user._id),
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
        })),
      },
      "Users retrieved successfully",
      200
    )
  );
});
