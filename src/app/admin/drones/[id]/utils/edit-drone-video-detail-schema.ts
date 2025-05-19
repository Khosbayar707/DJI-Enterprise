import z from "zod";

export const EditDroneVideoDetailSchema = z.object({
  name: z.string().min(3, { message: "Дор хаяж 3 усэгтэй байх ёстой!" }),
  detail: z.string().min(3, { message: "Дор хаяж 3 усэгтэй байх ёстой!" }),
  priority: z.number().max(5, { message: "Хамгийн ихдээ 5 байх ёстой!" }),
});
