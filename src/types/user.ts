// Define the types for the form fields
export interface IFormData {
  id: string;
  name: string;
  age: number;
  gender: string;
  status: string;
  dob: Date | null;
  file: File | null | AnyPresentValue;
  terms: boolean;
  skills: string[];
}

type AnyPresentValue = File | null | string | number | boolean;

export interface DataRow {
  name: string;
  age: number;
  gender: string;
  dob: any;
  skills: string[];
}

export interface FormDataStore {
  formData: IFormData[];
  addFormData: (data: IFormData) => void;
  deleteFormData: (index: string) => void;
  updateFormData: (id: string, updatedData: IFormData) => void;
  copyFormData: (row: IFormData) => void;
  setInitialData: (initialData: IFormData[]) => void;
}
