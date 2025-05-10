import { response } from "@/lib/types";
import { Snackbar } from "@mui/material";

export const CustomSnackbar = ({ value }: { value: response }) => {
  return (
    <Snackbar
      open={!!value}
      message={value?.message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
