import * as yup from "yup";
import { errorFormat } from "./errorFormat";
import { LoginData } from "../shared/interfaces/auth/login.interface";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      // eslint-disable-next-line no-useless-escape
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Password must be at least 8 Characters, contain at least one uppercase, one lowercase, one number and one special character"
    ),
});

export const validateLogin = (formData: LoginData) => {
  let isValid = true;
  let errs: LoginData = {} as LoginData;

  try {
    schema.validateSync({ ...formData }, { abortEarly: false });
  } catch (err: any) {
    isValid = false;
    errs = errorFormat(err);
  }

  return { isValid, errs };
};
