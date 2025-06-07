import z from 'zod';

export const AddDroneDescriptionSchema = z.object({
  highlight: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }),
  description: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }),
  priority: z.number().max(5, { message: 'Хамгийн ихдээ 5 байх ёстой!' }),
});
