import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  TableContainer,
  Paper,
} from "@mui/material";
import useToggle from "../hooks/useToggle";
import ConfirmationDialog from "./ConfirmationDialog";
import { formatDateWithMoment } from "../utils/helpers";
import CustomTablePagination from "./CustomPagination";

interface DataRow {
  id: string; // Unique identifier for each row
  name: string;
  age: number;
  gender: string;
  dob: any;
  skills: string[];
}

const TableComponent: React.FC<{
  data: DataRow[];
  onUpdate: (id: string, updatedData: DataRow) => void; // Use id instead of index
  onDelete: (id: string) => void;
  onCopy: (data: DataRow) => void;
}> = ({ data, onUpdate, onDelete, onCopy }) => {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof DataRow;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [editId, setEditId] = useState<string | null>(null); // Use id instead of index
  const [editData, setEditData] = useState<DataRow | null>(null);
  const [rowToDelete, setRowToDelete] = useState<string | null>(null);
  const { isOpen, open, close } = useToggle();

  // Sorting logic
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  // Filter logic
  const filteredData = useMemo(() => {
    return sortedData.filter(
      (row) =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.gender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.skills.some((skill) =>
          skill.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [sortedData, searchTerm]);

  // Handle sorting direction toggle
  const requestSort = useCallback(
    (key: keyof DataRow) => {
      let direction: "asc" | "desc" = "asc";
      if (
        sortConfig &&
        sortConfig.key === key &&
        sortConfig.direction === "asc"
      ) {
        direction = "desc";
      }
      setSortConfig({ key, direction });
    },
    [sortConfig]
  );

  // Handle search input change
  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  // Pagination logic
  const paginatedData = useMemo(() => {
    return filteredData.slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage
    );
  }, [filteredData, page, rowsPerPage]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle row delete confirmation
  const handleDelete = (id: string) => {
    setRowToDelete(id);
    open();
  };

  const confirmDelete = () => {
    if (rowToDelete !== null) {
      onDelete(rowToDelete);
      close();
      setRowToDelete(null);
    }
  };

  // Handle row edit
  const handleEdit = (id: string) => {
    setEditId(id);
    setEditData(data.find((row) => row.id === id) || null);
  };

  const handleEditChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editData) {
      setEditData({ ...editData, [event.target.name]: event.target.value });
    }
  };

  const saveEdit = () => {
    if (editId && editData) {
      onUpdate(editId, editData);
      setEditId(null);
      setEditData(null);
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData(null);
  };

  // Handle row copy
  const handleCopy = (id: string) => {
    const rowToCopy = data.find((row) => row.id === id);
    if (rowToCopy) {
      onCopy(rowToCopy);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TextField
        label="Search by name or skills"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "20px", marginTop: "1rem" }}
      />

      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="data table">
          <TableHead>
            <TableRow>
              <TableCell onClick={() => requestSort("name")}>Name</TableCell>
              <TableCell onClick={() => requestSort("age")}>Age</TableCell>
              <TableCell onClick={() => requestSort("gender")}>
                Gender
              </TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((row) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      name="name"
                      value={editData?.name || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    row.name
                  )}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      name="age"
                      value={editData?.age || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    row.age
                  )}
                </TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <TextField
                      name="gender"
                      value={editData?.gender || ""}
                      onChange={handleEditChange}
                    />
                  ) : (
                    row.gender
                  )}
                </TableCell>
                <TableCell>{formatDateWithMoment(row.dob)}</TableCell>
                <TableCell>
                  {editId === row.id ? (
                    <>
                      <Button onClick={saveEdit}>Save</Button>
                      <Button onClick={cancelEdit}>Cancel</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                      <Button onClick={() => handleCopy(row.id)}>Copy</Button>
                      <Button onClick={() => handleDelete(row.id)}>
                        Delete
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* cutom table pagination */}
      <CustomTablePagination
        rowsPerPageOptions={[5, 10, 25]}
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmationDialog
        open={isOpen}
        onClose={close}
        onConfirm={confirmDelete}
        title="Delete Row"
        description="Are you sure you want to delete this row? This action cannot be undone."
        confirmText="Confirm"
        cancelText="Cancel"
      />
    </Paper>
  );
};

export default TableComponent;
