import z from "zod";
export const LoginSchema = z.object({
  email: z.string().email({ message: "Зөв майл хаяг оруулна уу!" }),
  password: z
    .string()
    .min(6, { message: "Нууц үг дор хаяж 6 оронтой байх ёстой!" }),
});
