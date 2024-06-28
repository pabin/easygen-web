import * as yup from "yup";
import { UserData } from "../shared/interfaces/auth/signup.interface";
import { errorFormat } from "./errorFormat";

const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
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
  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password"), null], "Passwords must match"),

  confirmPassword: yup
    .string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required("Password is required"),

  // confirmPassword: yup
  //   .string()
  //   .oneOf([yup.ref("password")], "Passwords must match")
  //   .required("Confirm password is required"),
});

export const validateUser = (formData: UserData) => {
  let isValid = true;
  let errs: UserData = {} as UserData;

  try {
    schema.validateSync({ ...formData }, { abortEarly: false });
  } catch (err: any) {
    isValid = false;
    errs = errorFormat(err);
  }

  return { isValid, errs };
};
