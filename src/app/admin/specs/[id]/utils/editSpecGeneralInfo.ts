import z from 'zod';

export const EditSpecGeneralInfo = z.object({
  name: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  detail: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  previewText: z.string().min(3, { message: 'Дор хаяж 3 үсэг оруулна уу!' }).optional(),
  priority: z.number().optional(),
});

export const SpecDescriptionSchema = z.object({
  highlight: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }),
  description: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }),
  priority: z.number().max(5, { message: 'Хамгийн ихдээ 5 байх ёстой!' }),
});
