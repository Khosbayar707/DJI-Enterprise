import { z } from "zod";

export const AddGarminProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Бүтээгдэхүүний нэр дор хаяж 2 тэмдэгт байх ёстой!" }),
  category: z
    .string()
    .min(2, { message: "Ангилал дор хаяж 2 тэмдэгт байх ёстой!" }),
  price: z.number().min(0, { message: "Үнэ 0-ээс бага байж болохгүй!" }),
  images: z.array(z.string()),
  description: z.string().optional(),
  features: z.string().optional(),
  isNew: z.boolean(),
  rating: z
    .number()
    .min(0, { message: "Үнэлгээ 0-ээс бага байж болохгүй!" })
    .max(5, { message: "Үнэлгээ 5-аас их байж болохгүй!" })
    .optional(),
});

export type AddGarminProductSchemaType = z.infer<typeof AddGarminProductSchema>;
