import * as yup from "yup";

export const validateTask = yup.object().shape({
  user_mail: yup.string().required("(*) Pls!! choose user email"),
  project_id: yup.string().required("(*) Pls!! choose user project"),
  status: yup
    .number()
    .min(1, "(*) Should be choose status")
    .max(3, "(*) value cann't different"),
  note: yup.string().required("(*) Value not empty"),
});

export const validateProject = yup.object().shape({
  name: yup
    .string()
    .min(1, "(*) min name is 1 character")
    .max(50, "(*) max name is 50 character")
    .required("(*) pls!! field value"),
  payment: yup
    .number()
    .min(1, "(*) min payment is 1")
    .max(1000000, "(*) max payment is 1,000,000")
    .required("(*) pls field Value"),
  note: yup
    .string()
    .min(1, "min note is 1 character")
    .max(50, "(*) max note is 100 character")
    .required("(*) pls!! field value"),
  priority: yup
    .number()
    .min(1, "(*) pls! choose priority")
    .max(3, "(*) value max is 3")
    .required("(*) pls field Value"),
  time_start: yup.string().required("(*) date should not empty"),
  time_end: yup.string().required("(*) date should not empty"),
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
