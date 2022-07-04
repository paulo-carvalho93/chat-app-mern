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

export const createGroupChat = asyncHandler(
  async (request: Request, response: Response) => {
    if (!request.body.users || !request.body.name) {
      return response
        .status(400)
        .send({ message: "Please fill all the fields!" });
    }

    const users = JSON.parse(request.body.users);

    if (users.length < 2) {
      return response.status(400).send({
        message: "More than 2 users are required to form a Group Chat.",
      });
    }

    console.log(request.user);
    users.push(request.user);

    try {
      const groupChat = await Chat.create({
        chatName: request.body.name,
        users,
        isGroupChat: true,
        groupAdmin: request.user,
      });

      const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");

      response.status(200).json(fullGroupChat);
    } catch (error) {
      response.status(400);
      throw new Error(error.message);
    }
  }
);
