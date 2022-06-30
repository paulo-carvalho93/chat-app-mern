import { Request, Response } from "express";
import mongoose from "mongoose";

export const notFound = (
  request: Request,
  response: Response,
  next: mongoose.CallbackWithoutResultAndOptionalError
) => {
  const error = new Error(`Not Found - ${request.originalUrl}`);
  response.status(404);
  next(error);
};

export const errorHandler = (
  err,
  request: Request,
  response: Response,
  next: mongoose.CallbackWithoutResultAndOptionalError
) => {
  const statusCode = response.statusCode === 200 ? 500 : response.statusCode;
  response.status(statusCode);
  response.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
