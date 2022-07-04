import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IUser {
  _id: string;
  name: string;
  email: string;
  picture: string;
  token: string;
}

interface IChatContextData {
  user: IUser;
}

interface IChatProviderProps {
  children: React.ReactNode;
}

const ChatContext = createContext({} as IChatContextData);

const ChatProvider = ({ children }: IChatProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{ user, setUser }}>
      {children}
    </ChatContext.Provider>
  );
};

const useChatContext = () => useContext(ChatContext);
export default ChatProvider;

export { ChatProvider, useChatContext };
