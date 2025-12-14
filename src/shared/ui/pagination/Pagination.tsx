import { FC } from "react";
import { Pagination as MuiPagination } from "@mui/material";
import styles from "./Pagination.module.css";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    if (value >= 1 && value <= totalPages) {
      onPageChange(value);
    }
  };

  return (
    <div className={styles.pagination}>
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        color="primary"
        showFirstButton
        showLastButton
        siblingCount={1}
        boundaryCount={1}
      />
    </div>
  );
};
