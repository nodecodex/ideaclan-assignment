interface LabelDisplayedRowsArgs {
  from: number;
  to: number;
  count: number;
  page: number;
}

export interface TablePaginationProps {
  count: number;
  page: number;
  rowsPerPage: number;
  rowsPerPageOptions?: (number | { value: number; label: string })[];
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  >;
  labelRowsPerPage?: React.ReactNode;
  labelDisplayedRows?: (
    paginationInfo: LabelDisplayedRowsArgs
  ) => React.ReactNode;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  disabled?: boolean;
}
