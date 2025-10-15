import { PayloadType } from '@/generated/prisma'; // Make sure this is the actual enum, not just a type
import { z } from 'zod';

export const DronePayloadSchema = z.object({
  name: z.string().min(1, 'Нэр шаардлагатай'),
  type: z.nativeEnum(PayloadType),
  price: z.number().min(0, { message: 'Үнэ 0-ээс бага байж болохгүй!' }),
  stock: z.number().min(0, { message: 'Тоо хэмжээ 0-ээс бага байж болохгүй!' }),
  description: z.string().optional(),
  images: z.array(
    z.object({
      url: z.string(),
      public_id: z.string(),
    })
  ),
  features: z.string().optional(),
});

export type DronePayloadSchemaType = z.infer<typeof DronePayloadSchema>;
