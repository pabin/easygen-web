import { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import { userLogin } from "../store/authSlice";
import { useDispatch, useSelector } from "../store/reduxHooks";
import { validateLogin } from "../validations/validateLogin";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { LoginData } from "../shared/interfaces/auth/login.interface";

export default function UserLogin(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticating } = useSelector((s) => s.auth);

  const [formData, setData] = useState<LoginData>({} as LoginData);
  const [errors, setErrors] = useState<LoginData>({} as LoginData);
  const [loginError, setLoginError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setData((prev: LoginData) => ({ ...prev, [name]: value }));

    const { errs } = validateLogin({ ...formData, [name]: value });

    if (errs[name as keyof LoginData]) {
      setErrors((prev: LoginData) => ({
        ...prev,
        [name]: errs[name as keyof LoginData],
      }));
    } else {
      setErrors({} as LoginData);
    }
  };

  const onUserLogin = async () => {
    const { isValid, errs } = validateLogin(formData);

    if (isValid) {
      const response: any = await dispatch(userLogin(formData));
      if (response.meta.requestStatus === "fulfilled") {
        navigate("/dashboard", { replace: true });
      } else if (response.meta.requestStatus === "rejected") {
        setLoginError(response.payload?.message);
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
          <Heading fontSize={"4xl"}>Login to your account</Heading>
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
            <form>
              <Stack spacing={4}>
                <FormControl id="email" isInvalid={"email" in errors}>
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    name="email"
                    onChange={onFormChange}
                    value={formData.email}
                  />
                  <FormErrorMessage>{errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl id="password" isInvalid={"password" in errors}>
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
              </Stack>
            </form>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Text color={"blue.400"}>Forgot password?</Text>
              </Stack>

              {loginError && (
                <Text align={"center"} color="red" fontSize={"18px"}>
                  {loginError}
                </Text>
              )}

              <Button
                isLoading={isAuthenticating}
                onClick={onUserLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
              >
                Login
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                No User account ?{" "}
                <Text color={"blue.400"}>
                  <NavLink to="/signup">SignUp</NavLink>
                </Text>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
