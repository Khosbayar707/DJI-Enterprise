import z from "zod";

export const UserProfileChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Нууц үг дор хаяж 6 оронтой байх ёстой!" }),
    password: z
      .string()
      .min(6, { message: "Нууц үг дор хаяж 6 оронтой байх ёстой!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Нууц үг таарсангүй!",
    path: ["confirmPassword"],
  });

export type UserProfileChangePasswordSchemaType = z.infer<
  typeof UserProfileChangePasswordSchema
>;
