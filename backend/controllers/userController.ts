import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import generateToken from "../config/generateToken";
import User from "../models/userModel";

interface IUser {
  name: string;
  email: string;
  password: string;
  picture?: string;
}

export const registerUser = asyncHandler(
  async (request: Request, response: Response) => {
    const { name, email, password, picture } = <IUser>request.body;

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
    const { email, password } = <IUser>request.body;

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

export const getAllUsers = asyncHandler(
  async (request: Request, response: Response) => {
    const keyword = request.query.search
      ? {
          $or: [
            { name: { $regex: request.query.search, $options: "i" } },
            { email: { $regex: request.query.search, $options: "i" } },
          ],
        }
      : {};

    const users = await User.find(keyword).find({
      _id: { $ne: request.user._id },
    });
    response.send(users);
  }
);
