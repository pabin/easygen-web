import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink, useNavigate } from "react-router-dom";
import { UserData } from "../shared/interfaces/auth/signup.interface";
import { useDispatch } from "../store/reduxHooks";
import { validateUser } from "../validations/validateUser";
import { userSignupAPI } from "../api/authAPI";
import { userLogin } from "../store/authSlice";
import { LoginData } from "../shared/interfaces/auth/login.interface";
import axios from "axios";

export default function UserSignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setData] = useState<UserData>({} as UserData);
  const [errors, setErrors] = useState<UserData>({} as UserData);
  const [signupError, setSignupError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  console.log("formData", formData);
  console.log("errors", errors);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prev: UserData) => ({ ...prev, [name]: value }));

    const updatedData = { ...formData, [name]: value };
    const { errs } = validateUser(updatedData);
    setErrors(errs);
    // errs[name] ? setErrors({ [name]: errs[name] }) : setErrors({});
  };

  const onUserSignup = async () => {
    const { isValid, errs } = validateUser(formData);
    console.log("errs", errs);

    if (isValid) {
      try {
        await userSignupAPI(formData);
        const loginData: LoginData = {
          email: formData.email,
          password: formData.password,
        };
        const response: any = await dispatch(userLogin(loginData));
        if (response.meta.requestStatus === "fulfilled") {
          navigate("/dashboard", { replace: true });
        }
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.log("err signup", JSON.stringify(err.response?.data.message));

          setSignupError(err.response?.data.message);
        }
      }
    } else {
      setErrors(errs);
    }
  };
  return (
    <Flex
      minH={"80vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our courses
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl
                  id="firstName"
                  isRequired
                  isInvalid={"firstName" in errors}
                >
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    name="firstName"
                    onChange={onFormChange}
                    value={formData.firstName}
                  />
                  <FormErrorMessage>{errors.firstName}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isInvalid={"lastName" in errors}>
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    name="lastName"
                    onChange={onFormChange}
                    value={formData.lastName}
                  />
                  <FormErrorMessage>{errors.lastName}</FormErrorMessage>
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired isInvalid={"email" in errors}>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                name="email"
                onChange={onFormChange}
                value={formData.email}
              />
              <FormErrorMessage>{errors.email}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={"password" in errors}
            >
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  onChange={onFormChange}
                  value={formData.password}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              id="password"
              isRequired
              isInvalid={"confirmPassword" in errors}
            >
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  onChange={onFormChange}
                  value={formData.confirmPassword}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
            </FormControl>

            {signupError && (
              <Text align={"center"} color="red" fontSize={"18px"}>
                {signupError}
              </Text>
            )}

            <Stack spacing={10} pt={2}>
              <Button
                onClick={onUserSignup}
                loadingText="Submitting"
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?
                <Text color={"blue.400"}>
                  <NavLink to="/login">Login</NavLink>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
