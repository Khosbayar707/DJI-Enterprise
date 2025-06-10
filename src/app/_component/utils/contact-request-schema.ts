import z from 'zod';

const ContactRequestFromUserSchema = z.object({
  name: z.string().min(2, { message: 'Дор хаяж 2 үсэгтэй байх ёстой!' }),
  email: z.string().email({ message: 'Зөв майл оруулна уу!' }),
  phone: z.string().min(8, { message: 'Дор хаяж 8 -н оронтой байх ёстой!' }),
  message: z.string().min(15, { message: '15 үсэг агуулах ёстой!' }),
});

export type ContactRequestFromUserSchemaType = z.infer<typeof ContactRequestFromUserSchema>;
export default ContactRequestFromUserSchema;
