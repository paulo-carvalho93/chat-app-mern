import { Avatar, Box, Text } from "@chakra-ui/react";
import * as React from "react";

import { IUser } from "../../context/chatContext";

export interface IUserListItemProps {
  user: IUser;
  handleAccessChat: () => {};
}

export default function UserListItem({
  user,
  handleAccessChat,
}: IUserListItemProps) {
  return (
    <Box
      onClick={handleAccessChat}
      cursor="pointer"
      bg="#F0F0F0"
      _hover={{
        background: "#6E00FF",
        color: "white",
        transition: "color 0.2s",
      }}
      w="100%"
      display="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      <Avatar
        mr={2}
        size="sm"
        cursor="pointer"
        name={user.name}
        src={user.picture}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email}
        </Text>
      </Box>
    </Box>
  );
}
