import z from "zod";
export const EditDroneGeneralInfo = z.object({
  name: z
    .string()
    .min(2, { message: "Дор хаяж 2 үсэг оруулна уу!" })
    .optional(),
  description: z
    .string()
    .min(2, { message: "Дор хаяж 10 үсэг оруулна уу!" })
    .optional(),
  price: z.string().optional(),
  discount: z.string().optional(),
});
