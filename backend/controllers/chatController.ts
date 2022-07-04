import { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import Chat from "../models/chatModel";
import User from "../models/userModel";

export const accessChat = asyncHandler(
  async (request: Request, response: Response) => {
    const { userId } = request.body;

    if (!userId) {
      console.log("UserId param not sent with Request");
      return response.sendStatus(400);
    }

    let isChat = await Chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: request.user._id } } },
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");

    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name picture email",
    });

    if (isChat.length > 0) {
      response.send(isChat[0]);
    } else {
      const chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [request.user._id, userId],
      };

      try {
        const createdChat = await Chat.create(chatData);
        const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );

        response.status(200).send(fullChat);
      } catch (error) {
        response.status(400);
        throw new Error(error.message);
      }
    }
  }
);

export const fetchChats = asyncHandler(
  async (request: Request, response: Response) => {
    try {
      Chat.find({ users: { $elemMatch: { $eq: request.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updateAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name picture email",
          });

          response.status(200).send(results);
        });
    } catch (error) {
      response.status(400);
      throw new Error(error.message);
    }
  }
);
