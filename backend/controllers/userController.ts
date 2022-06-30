import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import generateToken from "../config/generateToken";
import User from "../models/userModel";

export const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { name, email, password, picture } = request.body;

    if (!name || !email || !password) {
      response.status(400);
      throw new Error("Please enter all the Fields.");
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      response.status(400);
      throw new Error("User already exists.");
    }

    const user = await User.create({
      name,
      email,
      password,
      picture,
    });

    if (user) {
      response.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      response.status(400);
      throw new Error("Failed to create a new User.");
    }
  }
);

export const authUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      response.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
        token: generateToken(user._id),
      });
    } else {
      response.status(400);
      throw new Error("Invalid Email or Password.");
    }
  }
);
