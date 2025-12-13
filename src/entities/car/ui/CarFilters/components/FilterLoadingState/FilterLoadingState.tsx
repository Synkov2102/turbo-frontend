import { FC } from "react";
import { Paper, CircularProgress, Typography } from "@mui/material";
import styles from "./FilterLoadingState.module.css";

export const FilterLoadingState: FC = () => {
  return (
    <Paper className={styles.loading}>
      <CircularProgress size={24} />
      <Typography variant="body2">Загрузка фильтров...</Typography>
    </Paper>
  );
};
