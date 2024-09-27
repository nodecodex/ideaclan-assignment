import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FormComponent from "./components/FormComponent"; // Import the form component
import { IFormData } from "./types/user";
import TableComponent from "./components/TableComponent";
import userData from "./mocks/data.json";
import "./App.css";
import useFormDataStore from "./hooks/useFormDataStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { generateUID } from "./utils/helpers";

const App: React.FC = () => {
  const {
    formData,
    addFormData,
    deleteFormData,
    updateFormData,
    copyFormData,
    setInitialData,
  } = useFormDataStore();

  // generate a new unique ID
  const userId = generateUID();

  // Parse initial data and load into Zustand (only on first render)
  useEffect(() => {
    if (formData.length === 0) {
      const parsedData: IFormData[] = userData.map((item: any) => {
        const uid = generateUID();
        return {
          ...item,
          id: uid,
          dob: new Date(item.dob), // Convert string to Date object
        };
      });
      setInitialData(parsedData); // Load initial mock data
    }
  }, [formData, setInitialData]);

  // Submit handler to save form data
  const handleSubmit = (data: any, resetForm: () => void) => {
    toast.success("Form submitted successfully!");
    addFormData({ ...data, id: userId }); // Add to Zustand store
    // Reset the form after submission
    resetForm();
  };

  // Delete handler
  const handleDelete = (id: string) => {
    toast.success(`User deleted successfully! ${id}`);
    deleteFormData(id); // Delete from Zustand store
  };

  // Update handler
  const handleUpdate = (id: string, updatedData: IFormData) => {
    toast.success(`${updatedData.name} updated successfully! `);
    updateFormData(id, updatedData); // Update in Zustand store
  };

  // Copy handler
  const handleCopy = (row: IFormData) => {
    copyFormData(row); // Copy the row in Zustand store
    toast.success("Row copied successfully!");
  };

  return (
    <>
      {/* Toast container that will display the toast messages */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />

      <Router>
        <Routes>
          {/* Form Component */}
          <Route path="/" element={<FormComponent onSubmit={handleSubmit} />} />

          {/* Table */}
          <Route
            path="/table"
            element={
              <TableComponent
                data={formData}
                onDelete={handleDelete}
                onCopy={handleCopy}
                onUpdate={handleUpdate}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
