import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { fetchChats } from "../api/services";
import { getSender } from "../config/chatLogics";
import { useChatContext } from "../context/chatContext";
import ChatLoading from "./ChatLoading";

export default function MyChats() {
  const toast = useToast();
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } =
    useChatContext();

  const getChats = async () => {
    try {
      const { data } = await fetchChats(user.token);
      setChats(data);
    } catch (error) {
      toast({
        title: "Oops! Something went wrong!!",
        description: "Failed to load the Chats!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo") || "{}"));
    getChats();
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        pb={3}
        px={3}
        fontFamily="Roboto"
        fontSize={{ base: "1.75rem", md: "1.875rem" }}
      >
        My Chats
        <Button
          display="flex"
          fontSize={{ base: "17px", md: "10px", lg: "17px" }}
          rightIcon={<AddIcon />}
        >
          New Group Chat
        </Button>
      </Box>

      <Box
        display="flex"
        flexDir="column"
        w="100%"
        h="100%"
        p={3}
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                key={chat._id}
                cursor="pointer"
                bg={selectedChat === chat ? "#6E00FF" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={3}
                borderRadius="lg"
                onClick={() => setSelectedChat(chat)}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
}
