import z from 'zod';
export const InstructionRequestSchema = z.object({
  username: z.string().min(2, { message: 'Дор хаяж 3 үсэг оруулна уу!' }),
  phone: z.string().min(8, { message: 'Дор хаяж 8 орон оруулна уу!' }),
  email: z.string().email({ message: 'Буруу майл' }),
});

export type InstructionRequestSchemaType = z.infer<typeof InstructionRequestSchema>;
