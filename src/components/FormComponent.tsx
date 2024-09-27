import React, { ChangeEvent } from "react";
import {
  TextField,
  Select,
  MenuItem,
  RadioGroup,
  Radio,
  Checkbox,
  Button,
  FormControlLabel,
  InputLabel,
  FormControl,
  FormLabel,
  Grid,
  Typography,
  Paper,
} from "@mui/material";

import { Controller } from "react-hook-form";
import { IFormData } from "../types/user";
import useFormWithValidation from "../hooks/useFormWithValidation";
import skilsData from "../mocks/skillsdata.json";
import { useNavigate } from "react-router-dom";

const FormComponent: React.FC<{
  onSubmit: (data: IFormData, resetForm: () => void) => void;
}> = ({ onSubmit }) => {
  const { control, handleSubmit, errors } = useFormWithValidation(onSubmit);
  const navigation = useNavigate();

  return (
    <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
      <Typography variant="h4" align="center" gutterBottom>
        User Information Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Text Field for Name */}
          <Grid item xs={12} md={6}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  {...field}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              )}
            />
          </Grid>
          {/* Number Input for Age */}
          <Grid item xs={12} md={6}>
            <Controller
              name="age"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Age"
                  type="number"
                  {...field}
                  error={!!errors.age}
                  helperText={errors.age?.message}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                />
              )}
            />
          </Grid>
          {/* Select Dropdown for Gender */}
          <Grid item xs={12} md={6}>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.gender}>
                  <InputLabel>Gender</InputLabel>
                  <Select {...field} label="Gender" variant="outlined">
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <p
                    style={{
                      color: "red",
                      textAlign: "start",
                      fontSize: "0.75rem",
                    }}
                  >
                    {errors.gender?.message}
                  </p>
                </FormControl>
              )}
            />
          </Grid>
          {/* Radio Buttons for Status */}
          <Grid item xs={12} md={6}>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl component="fieldset" fullWidth>
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup {...field} row>
                    <FormControlLabel
                      value="married"
                      control={<Radio />}
                      label="Married"
                    />
                    <FormControlLabel
                      value="single"
                      control={<Radio />}
                      label="Single"
                    />
                  </RadioGroup>
                  <p
                    style={{
                      color: "red",
                      textAlign: "start",
                      fontSize: "0.75rem",
                    }}
                  >
                    {errors.status?.message}
                  </p>
                </FormControl>
              )}
            />
          </Grid>

          {/* Date Picker for Date of Birth */}
          <Grid item xs={12} md={6}>
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Date of Birth"
                  type="datetime-local" // Use 'datetime-local' to capture the full timestamp
                  {...field}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => {
                    // Convert to the desired ISO string format
                    const newValue = e.target.value
                      ? new Date(e.target.value).toISOString()
                      : null;
                    field.onChange(newValue);
                  }}
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ""
                  }
                />
              )}
            />
          </Grid>

          {/* File Upload for File Input */}
          <Grid item xs={12} md={6}>
            <Controller
              name="file"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      field.onChange(e.target.files ? e.target.files[0] : null)
                    }
                  />
                  {errors.file && (
                    <p
                      style={{
                        color: "red",
                        textAlign: "start",
                        fontSize: "0.75rem",
                      }}
                    >
                      {errors.file.message}
                    </p>
                  )}
                </>
              )}
            />
          </Grid>
          {/* Multi-Select Dropdown for Skills */}
          <Grid item xs={12} md={6}>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.skills}>
                  <InputLabel>Skills</InputLabel>
                  <Select
                    {...field}
                    multiple
                    renderValue={(selected) =>
                      (selected as string[]).join(", ")
                    }
                    variant="outlined"
                  >
                    {skilsData?.map((data, i) => (
                      <MenuItem value={data?.value} key={i}>
                        {data?.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <p
                    style={{
                      color: "red",
                      textAlign: "start",
                      fontSize: "0.75rem",
                    }}
                  >
                    {errors.skills?.message}
                  </p>
                </FormControl>
              )}
            />
          </Grid>
          {/* Checkbox for Terms Agreement */}
          <Grid item xs={12} md={6}>
            <Controller
              name="terms"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label="I accept the terms and conditions"
                />
              )}
            />
            {errors.terms && (
              <p
                style={{
                  color: "red",
                  textAlign: "start",
                  fontSize: "0.75rem",
                }}
              >
                {errors.terms.message}
              </p>
            )}
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12} sm={6}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={() => navigation("/table")}
              variant="contained"
              color="primary"
              sx={{
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              View Table
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default FormComponent;
