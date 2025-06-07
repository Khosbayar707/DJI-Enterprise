import z from 'zod';

export const ContactInfoSchema = z.object({
  name: z.string().min(3, { message: 'Дор хаяж 3 -н тэмдэгт оруулна уу!' }),
  phone: z.string().min(8, { message: 'Утасны дугаар 8 -н оронтой байх ёстой!' }),
  description: z.string().optional(),
});
