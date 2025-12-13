import { Button } from "@mui/material";
import styles from "./FilterActions.module.css";

interface FilterActionsProps {
  onReset: () => void;
  onApply: () => void;
}

export const FilterActions = ({ onReset, onApply }: FilterActionsProps) => {
  return (
    <div className={styles.actions}>
      <Button
        variant="outlined"
        onClick={onReset}
        className={styles.resetButton}
      >
        Сбросить
      </Button>
      <Button
        variant="contained"
        onClick={onApply}
        className={styles.applyButton}
      >
        Применить
      </Button>
    </div>
  );
};
