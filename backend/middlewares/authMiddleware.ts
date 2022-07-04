import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import User from "../models/userModel";

interface IJwtPayload {
  id: string;
}

export const protect = asyncHandler(
  async (request: Request, response: Response, next) => {
    let token;

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // eslint-disable-next-line prefer-destructuring
        token = request.headers.authorization.split(" ")[1];

        // Decodes tokenId
        const { id } = jwt.verify(
          token,
          String(process.env.JWT_SECRET)
        ) as IJwtPayload;
        const user = await User.findById(id).select("-password");
        request.user = user;
        next();
      } catch (error) {
        response.status(401);
        throw new Error("Not authorized, token failed!");
      }
    }

    if (!token) {
      response.status(401);
      throw new Error("Not authorized, no token sent!");
    }
  }
);
