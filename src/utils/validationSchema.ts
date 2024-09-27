import * as yup from "yup";

// Schema for validation using Yup
export const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .min(1, "Age must be greater than 0"),
  gender: yup.string().required("Gender is required"),
  status: yup.string().required("Status is required"),
  dob: yup
    .date()
    .nullable() // Allows null values to be handled properly
    .typeError("Date of birth is required") // This ensures that an invalid date input also triggers an error
    .required("Date of birth is required"),
  file: yup
    .mixed()
    .required("File upload is required")
    .test("fileSize", "File is too large", (value: any) => {
      return value ? value.size <= 2000000 : false; // Max 2MB
    }),
  terms: yup.bool().oneOf([true], "You must accept the terms"),
  skills: yup.array().min(1, "At least one skill is required"),
});
