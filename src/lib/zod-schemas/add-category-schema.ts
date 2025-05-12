import z from "zod";

export const AddCategorySchema = z.object({
  name: z.string().min(1, { message: "Нэр оруулна уу!" }),
  type: z.enum(["drone", "spec"]),
});
