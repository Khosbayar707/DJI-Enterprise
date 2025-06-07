import z from 'zod';

export const RegisterSchema = z
  .object({
    email: z.string().email({ message: 'Зөв майл хаяг оруулна уу!' }),
    password: z.string().min(6, { message: 'Нууц үг дор хаяж 6 оронтой байх ёстой!' }),
    confirmPassword: z.string().min(6, { message: 'Нууц үг дор хаяж 6 оронтой байх ёстой!' }),
    sub_news: z.boolean(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Нууц үг таарсангүй!',
    path: ['confirmPassword'],
  });
