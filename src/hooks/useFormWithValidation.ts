import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IFormData } from "../types/user";
import { schema } from "../utils/validationSchema";

const useFormWithValidation = (
  onSubmit: (data: IFormData, resetForm: () => void) => void
) => {
  const {
    control,
    handleSubmit,
    reset, // Reset function from react-hook-form
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      age: 0,
      gender: "",
      status: "",
      dob: null,
      file: null,
      terms: false,
      skills: [],
    },
  });

  // Custom submit handler that also resets the form after calling the provided onSubmit function
  const handleFormSubmit = (data: IFormData) => {
    onSubmit(data, reset); // Pass reset to onSubmit so the form can be reset after submission
  };

  return {
    control,
    handleSubmit: handleSubmit(handleFormSubmit),
    reset, // Make reset available for manual resets if needed
    errors,
  };
};

export default useFormWithValidation;
