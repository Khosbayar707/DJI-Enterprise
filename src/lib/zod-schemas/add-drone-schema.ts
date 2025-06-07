import z from 'zod';

export const AddDroneSchema = z.object({
  name: z.string().min(1, { message: 'Бүтээгдэхүүний нэр хоосон байж болохгүй!' }),
  description: z.string(),
});
