import z from "zod";
export const AddProductSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Бүтээгдэхүүний нэр хоосон байж болохгүй!" }),
});
