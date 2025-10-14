import { z } from 'zod';

export const AddGarminProductSchema = z.object({
  name: z.string().min(2, { message: 'Бүтээгдэхүүний нэр дор хаяж 2 тэмдэгт байх ёстой!' }),
  type: z.enum(['SMARTWATCH', 'GPS'], {
    message: 'Бүтээгдэхүүний төрөл SMARTWATCH эсвэл GPS байх ёстой!',
  }),
  price: z.number().min(0, { message: 'Үнэ 0-ээс бага байж болохгүй!' }),
  stock: z.number().min(0, { message: 'Тоо хэмжээ 0-ээс бага байж болохгүй!' }),
  images: z.array(
    z.object({
      url: z.string(),
      public_id: z.string(),
    })
  ),
  description: z.string().optional(),
  features: z.string().optional(),
  isNew: z.boolean(),
  rating: z
    .number()
    .min(0, { message: 'Үнэлгээ 0-ээс бага байж болохгүй!' })
    .max(5, { message: 'Үнэлгээ 5-аас их байж болохгүй!' })
    .optional(),
  specifications: z
    .array(
      z.object({
        label: z.string().min(1, { message: 'Тодорхойлолтын нэр шаардлагатай!' }),
        value: z.string().min(1, { message: 'Тодорхойлолтын утга шаардлагатай!' }),
      })
    )
    .optional(),
});

export type AddGarminProductSchemaType = z.infer<typeof AddGarminProductSchema>;
