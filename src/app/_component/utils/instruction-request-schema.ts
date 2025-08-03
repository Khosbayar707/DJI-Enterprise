import z from 'zod';

export const InstructionRequestSchema = z.object({
  username: z.string().min(2, { message: 'Дор хаяж 3 үсэг оруулна уу!' }),
  phone: z.string().min(8, { message: 'Дор хаяж 8 орон оруулна уу!' }),
  email: z.string().email({ message: 'Буруу майл' }),
  instructionType: z.enum(
    [
      'HOBBY_DRONE',
      'PROFESSIONAL_DRONE',
      'AERIAL_MAPPING',
      'AGRICULTURAL_DRONE',
      'FORESTRY_DRONE',
      'MINING_DRONE',
    ],
    {
      required_error: 'Сургалтын төрөл шаардлагатай!',
      invalid_type_error: 'Буруу сургалтын төрөл байна.',
    }
  ),
});

export type InstructionRequestSchemaType = z.infer<typeof InstructionRequestSchema>;
