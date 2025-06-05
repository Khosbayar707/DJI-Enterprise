"use client";
import { CustomSnackbar } from "@/app/admin/_components/snackbar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ResponseType } from "@/lib/types";
import { TextField } from "@mui/material";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
  email: string;
  setRefresh: Dispatch<SetStateAction<boolean>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setResponse: Dispatch<SetStateAction<ResponseType | undefined>>;
  loading: boolean;
};

const UserProfileConfirmPassword = ({
  loading,
  email,
  setRefresh,
  setResponse,
  setLoading,
}: Props) => {
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false); // <-- added state

  const handleChangeEmail = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/current-user/change-email", {
        email,
        password,
      });
      if (res.data.success) {
        setRefresh((prev) => !prev);
        setOpen(false); // <-- close dialog on success
      }
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Хадгалах
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Өөрийгөө баталгаажуулна уу!</DialogTitle>
        <TextField
          disabled={loading}
          type="password"
          label="Нууц үгээ орууна уу!"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleChangeEmail();
            }
          }}
          className="w-full p-2 border rounded"
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserProfileConfirmPassword;
