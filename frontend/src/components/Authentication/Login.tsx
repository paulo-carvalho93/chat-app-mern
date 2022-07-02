import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../../api/services";

interface ILoginParams {
  email: string;
  password: string;
}

const INITIAL_FORM_DATA: ILoginParams = {
  email: "",
  password: "",
};

export default function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState<ILoginParams>(INITIAL_FORM_DATA);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const { data } = await loginUser(formData);

    if (data) {
      toast({
        title: "Login Successfully!",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("chats");
    } else {
      toast({
        title: "Oops! Something went wrong!!",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="0.313rem" color="black">
      <FormControl id="email-login" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            name="password"
            type={show ? "text" : "password"}
            placeholder="Enter your Password"
            value={password}
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="blue"
        width="100%"
        onClick={() => {
          setFormData({
            ...formData,
            email: "guest@example.com",
            password: "123456",
          });
        }}
      >
        Login as Guest User
      </Button>
    </VStack>
  );
}
