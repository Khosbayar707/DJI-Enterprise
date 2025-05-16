import { ResponseType } from "@/lib/types";
import { Snackbar } from "@mui/material";

export const CustomSnackbar = ({ value }: { value: ResponseType }) => {
  return (
    <Snackbar
      className="z-51"
      open={!!value}
      message={value?.message}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    />
  );
};
