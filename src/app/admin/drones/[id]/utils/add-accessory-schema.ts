import z from "zod";

export const AddAccessorySchema = z.object({
  name: z.string().min(1, { message: "Нэр оруулна уу!" }),
});
