import axios from "axios";
import { useEffect } from "react";

export interface ChatProps {}

export default function Chat(props: ChatProps) {
  const fetchChats = async () => {
    const data = await axios.get("/api/chat");
    console.log(data);
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return <div>Chat</div>;
}
