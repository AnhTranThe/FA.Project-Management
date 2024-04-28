import * as yup from "yup";

export const validateTask = yup.object().shape({
  user_mail: yup.string().required("(*) Pls!! choose user email"),
  project_id: yup.string().required("(*) Pls!! choose user project"),
  status: yup
    .number()
    .min(1, "(*) Should be from 1")
    .max(5, "(*) Should be smaller 5")
    .required("(*) value Should be from 1 to 5"),
  note: yup.string().required("(*) Value not empty"),
});

export const validateSignUp = yup.object().shape({
  email: yup
    .string()
    .email("Invailid email")
    .required("(*) Pls!! Fill your email"),
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
