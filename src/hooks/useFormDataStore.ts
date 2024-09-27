import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FormDataStore } from "../types/user"; // Assuming you have this interface
import { generateUID } from "../utils/helpers";

const useFormDataStore = create<FormDataStore>()(
  persist(
    (set, get) => ({
      formData: [],

      // Add new form data
      addFormData: (data) =>
        set((state) => ({
          formData: [...state.formData, data],
        })),

      // Delete form data by index
      deleteFormData: (id) => {
        console.log("Delete Index:", id); // Debug the index
        console.log({ id });
        set((state) => {
          const currentFormData = state.formData;

          const updatedFormData = currentFormData.filter(
            (data, i) => data.id !== id
          );
          return { formData: updatedFormData };
        });
      },

      // Update existing form data by id
      updateFormData: (id, updatedData) =>
        set((state) => {
          const updatedRows = state.formData.map((data) =>
            data.id === id ? updatedData : data
          );
          return { formData: updatedRows };
        }),
      // Copy form data
      copyFormData: (row) =>
        set((state) => ({
          formData: [
            ...state.formData,
            { ...row, id: generateUID(), name: `${row.name} (Copy)` },
          ],
        })),

      // Set initial form data
      setInitialData: (initialData) =>
        set(() => ({
          formData: initialData,
        })),
    }),
    {
      name: "form-data-storage",
    }
  )
);

export default useFormDataStore;
