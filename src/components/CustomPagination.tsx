import React from "react";
import { TablePaginationProps } from "../types/pagination";

const CustomTablePagination: React.FC<TablePaginationProps> = ({
  count,
  page,
  rowsPerPage,
  rowsPerPageOptions = [5, 10, 25],
  onPageChange,
  onRowsPerPageChange,
  labelRowsPerPage = "Rows per page:",
  labelDisplayedRows = ({ from, to, count }) => `${from}-${to} of ${count}`,
  showFirstButton = false,
  showLastButton = false,
  disabled = false,
}) => {
  const totalPages = Math.ceil(count / rowsPerPage);
  const from = page * rowsPerPage + 1;
  const to = Math.min(count, (page + 1) * rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages && !disabled) {
      onPageChange(null, newPage);
    }
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (onRowsPerPageChange) {
      onRowsPerPageChange(event as any);
    }
  };

  return (
    <div style={paginationStyles.container}>
      <div style={paginationStyles.rowsPerPage}>
        <label htmlFor="rows-per-page" style={paginationStyles.label}>
          {labelRowsPerPage}
        </label>
        <select
          id="rows-per-page"
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          style={paginationStyles.select}
          disabled={disabled}
        >
          {rowsPerPageOptions.map((option) => {
            const value = typeof option === "number" ? option : option.value;
            const label = typeof option === "number" ? option : option.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </div>

      <div style={paginationStyles.pageNavigation}>
        {showFirstButton && (
          <button
            onClick={() => handlePageChange(0)}
            disabled={page === 0 || disabled}
            style={
              page === 0 || disabled
                ? paginationStyles.disabledButton
                : paginationStyles.button
            }
          >
            {"<<"}
          </button>
        )}
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0 || disabled}
          style={
            page === 0 || disabled
              ? paginationStyles.disabledButton
              : paginationStyles.button
          }
        >
          {"<"}
        </button>
        <span style={paginationStyles.labelDisplayedRows}>
          {labelDisplayedRows({ from, to, count, page })}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1 || disabled}
          style={
            page >= totalPages - 1 || disabled
              ? paginationStyles.disabledButton
              : paginationStyles.button
          }
        >
          {">"}
        </button>
        {showLastButton && (
          <button
            onClick={() => handlePageChange(totalPages - 1)}
            disabled={page >= totalPages - 1 || disabled}
            style={
              page >= totalPages - 1 || disabled
                ? paginationStyles.disabledButton
                : paginationStyles.button
            }
          >
            {">>"}
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced inline styles for better visuals
const paginationStyles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    fontSize: "16px",
    marginTop: "1rem",
    transition: "all 0.3s ease-in-out",
  },
  rowsPerPage: {
    display: "flex",
    alignItems: "center",
  },
  label: {
    fontWeight: "500",
    color: "#333",
    marginRight: "10px",
  },
  select: {
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ddd",
    fontSize: "16px",
    color: "#333",
    cursor: "pointer",
    transition: "border-color 0.3s ease-in-out",
  },
  pageNavigation: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    margin: "0 5px",
    padding: "8px 12px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease-in-out",
    outline: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  disabledButton: {
    margin: "0 5px",
    padding: "8px 12px",
    backgroundColor: "#ddd",
    color: "#aaa",
    borderRadius: "4px",
    border: "none",
    cursor: "not-allowed",
  },
  labelDisplayedRows: {
    margin: "0 15px",
    fontSize: "16px",
    color: "#333",
  },
};

export default CustomTablePagination;
