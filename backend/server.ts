import dotenv from "dotenv";
import express from "express";

import { chats } from "./data/data";

const app = express();
dotenv.config();

app.get("/", (request, response) => {
  response.send("API is running!");
});

app.get("/api/chat", (request, response) => {
  response.send(chats);
});

app.get("/api/chat/:id", (request, response) => {
  const singleChat = chats.find((chat) => chat._id === request.params.id);
  response.send(singleChat);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server started on Port ${PORT}`));
