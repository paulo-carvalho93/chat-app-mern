import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

export interface ISignUpProps {}

interface IUserSignUp {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  picture?: FileList | null;
}

export default function SignUp(props: ISignUpProps) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<IUserSignUp>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleShowPassword = () => {
    setShow(!show);
  };

  const postDetails = (pic: FileList) => {};

  const submitHandler = () => {};

  return (
    <VStack spacing="0.313rem" color="black">
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
        onClick={submitHandler}
      >
        Sign Up
      </Button>
    </VStack>
  );
}
