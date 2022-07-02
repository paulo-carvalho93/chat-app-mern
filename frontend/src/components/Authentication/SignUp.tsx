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

import { createUser } from "../../api/services";

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture?: File | string;
}

const INITIAL_FORM_DATA: IUserSignUp = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  picture: "",
};

export default function SignUp() {
  const toast = useToast();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<IUserSignUp>(INITIAL_FORM_DATA);

  const { name, email, password, confirmPassword, picture } = formData;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  const postDetails = (pic: File) => {
    setLoading(true);
    if (pic === undefined) {
      toast({
        title: "Please, select an image!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    if (pic.type === "image/jpeg" || pic.type === "image/png") {
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "paulocarvalho");

      fetch(import.meta.env.VITE_CLOUDINARY_URI, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setFormData({ ...formData, picture: data.url.toString() });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmPassword) {
      console.log("Entrei", name, email, password, confirmPassword);
      toast({
        title: "Please fill all the fields!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords do not match!",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    const payloadUser = {
      name,
      email,
      password,
      picture,
    };
    const { data } = await createUser(payloadUser);

    if (data) {
      toast({
        title: "Registration successfull!",
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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter your Name"
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter your Email"
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
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            name="confirmPassword"
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={handleChange}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="picture" isRequired>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          name="picture"
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            postDetails(e.target.files[0])
          }
        />
      </FormControl>
      <Button
        colorScheme="purple"
        width="100%"
        style={{ marginTop: 15 }}
        isLoading={loading}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
