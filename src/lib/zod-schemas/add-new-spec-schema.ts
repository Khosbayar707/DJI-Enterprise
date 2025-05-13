import z from "zod";

export const AddNewSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Бүтээгдэхүүний нэр хоосон байж болохгүй!" }),
  detail: z.string(),
});
