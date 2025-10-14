import { EquipmentType } from '@/generated/prisma';
import { z } from 'zod';

export const AddSurveyEquipmentSchema = z.object({
  name: z.string().min(2, { message: 'Нэр дор хаяж 2 тэмдэгт байх ёстой' }),
  type: z.nativeEnum(EquipmentType),
  brand: z.string().optional(),
  description: z.string(),
  price: z.number().min(0, { message: 'Үнэ 0-ээс бага байж болохгүй!' }),
  stock: z.number().min(0, { message: 'Тоо хэмжээ 0-ээс бага байж болохгүй!' }),
  features: z.string().optional(),
  images: z.array(
    z.object({
      url: z.string(),
      public_id: z.string(),
    })
  ),
  specifications: z
    .array(
      z.object({
        label: z.string().min(1, { message: 'Тодорхойлолтын нэр шаардлагатай!' }),
        value: z.string().min(1, { message: 'Тодорхойлолтын утга шаардлагатай!' }),
      })
    )
    .optional(),
});

export type AddSurveyEquipmentSchemaType = z.infer<typeof AddSurveyEquipmentSchema>;
