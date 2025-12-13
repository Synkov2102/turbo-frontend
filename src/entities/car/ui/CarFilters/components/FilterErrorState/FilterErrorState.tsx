import { FC } from "react";
import { Paper, Typography } from "@mui/material";
import styles from "./FilterErrorState.module.css";

interface FilterErrorStateProps {
  error: Error;
}

export const FilterErrorState: FC<FilterErrorStateProps> = ({ error }) => {
  return (
    <Paper className={styles.error}>
      <Typography color="error">
        Ошибка загрузки фильтров: {error.message}
      </Typography>
    </Paper>
  );
};

