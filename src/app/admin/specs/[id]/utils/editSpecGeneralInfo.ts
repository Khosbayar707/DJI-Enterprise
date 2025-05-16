import z from "zod";

export const EditSpecGeneralInfo = z.object({
  name: z
    .string()
    .min(2, { message: "Дор хаяж 2 үсэг оруулна уу!" })
    .optional(),
  detail: z
    .string()
    .min(2, { message: "Дор хаяж 10 үсэг оруулна уу!" })
    .optional(),
});
