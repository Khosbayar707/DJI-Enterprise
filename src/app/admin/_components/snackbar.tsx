import { ResponseType } from "@/lib/types";
import { Snackbar } from "@mui/material";

export const CustomSnackbar = ({ value }: { value: ResponseType }) => {
  return (
    <Snackbar
      open={!!value}
      message={value?.message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
