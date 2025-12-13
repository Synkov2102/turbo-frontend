import { Box, Button, Typography } from "@mui/material";
import styles from "./FilterHeader.module.css";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

interface FilterHeaderProps {
  closeDrawer?: VoidFunction;
}

export const FilterHeader = ({ closeDrawer }: FilterHeaderProps) => {
  return (
    <Box className={styles.header}>
      <div className={styles.headerTitle}>
        <SearchIcon />
        <Typography variant="h6">Фильтры</Typography>
      </div>
      <Button size="small" variant="contained" onClick={closeDrawer}>
        <CloseIcon />
      </Button>
    </Box>
  );
};
