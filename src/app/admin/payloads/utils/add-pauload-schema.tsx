import { z } from 'zod';

export const DronePayloadSchema = z.object({
  name: z.string().min(1, 'Нэр шаардлагатай'),
  type: z.enum(['ZENMUSE', 'LIDAR', 'SPEAKER', 'SPOTLIGHT', 'TETHER', 'OTHER']),
  description: z.string().optional(),
  imageUrl: z.string().url('Зургийн URL шаардлагатай'),
});

export type DronePayloadSchemaType = z.infer<typeof DronePayloadSchema>;
