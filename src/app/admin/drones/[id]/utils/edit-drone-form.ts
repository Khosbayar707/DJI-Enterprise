import z from 'zod';
export const EditDroneGeneralInfo = z.object({
  name: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  description: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  briefDescription: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  price: z.string().optional(),
  discount: z.string().optional(),
  previewText: z.string().min(2, { message: 'Дор хаяж 2 үсэг оруулна уу!' }).optional(),
  stock: z.string().min(1, { message: 'Дор хаяж 1 оруулна уу!' }).optional(),
});
