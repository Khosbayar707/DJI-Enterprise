import z from "zod";

export const EditDroneImageDetailSchema = z.object({
  name: z.string().min(3, { message: "Дор хаяж 3 усэгтэй байх ёстой!" }),
  description: z.string().min(3, { message: "Дор хаяж 3 усэгтэй байх ёстой!" }),
});
