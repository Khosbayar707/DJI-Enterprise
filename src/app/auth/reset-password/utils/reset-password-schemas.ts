import z from "zod";

export const ResetPasswordStep1Schema = z.object({
  email: z.string().email({ message: "Зөв майл оруулна уу!" }),
});

export const ResetPasswordStep2Schema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Дор хаяж 6 -н оронтой байх ёстой!" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Нууц үг таарахгүй байна!",
  });
