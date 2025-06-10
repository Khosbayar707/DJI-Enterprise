import z from 'zod';
export const InstructionRequestSchema = z.object({
  username: z.string(),
  phone: z.string(),
  email: z.string().email(),
});

export type InstructionRequestSchemaType = z.infer<typeof InstructionRequestSchema>;
