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
import { useDispatch, useSelector } from "../store/reduxHooks";
import { validateUser } from "../validations/validateUser";
import { userSignup } from "../store/authSlice";

export default function UserSignUp(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticating } = useSelector((s) => s.auth);

  const [formData, setData] = useState<UserData>({} as UserData);
  const [errors, setErrors] = useState<UserData>({} as UserData);
  const [signupError, setSignupError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prev: UserData) => ({ ...prev, [name]: value }));

    const { errs } = validateUser({ ...formData, [name]: value });

    if (errs[name as keyof UserData]) {
      setErrors((prev: UserData) => ({
        ...prev,
        [name]: errs[name as keyof UserData],
      }));
    } else {
      setErrors({} as UserData);
    }
  };

  const onUserSignup = async () => {
    const { isValid, errs } = validateUser(formData);

    if (isValid) {
      const response: any = await dispatch(userSignup(formData));
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/dashboard", { replace: true });
      } else if (response.meta.requestStatus === "rejected") {
        setSignupError(response.payload?.message);
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
                    defaultValue={formData.firstName}
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
                    defaultValue={formData.lastName}
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
                defaultValue={formData.email}
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
                  defaultValue={formData.password}
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
              id="confirm-password"
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
                  defaultValue={formData.confirmPassword}
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
                isLoading={isAuthenticating}
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
              <Text align={"center"}>Already a user?</Text>
              <Text fontSize={"18px"} color={"blue.400"} align={"center"}>
                <NavLink to="/login">Login</NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
