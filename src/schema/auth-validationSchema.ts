import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .trim()
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Minimum 8 characters")
    .trim()
    .required("Password is required"),
});
