import z from 'zod';

export const AddDroneAdvantageSchema = z.object({
  detail: z.string().min(3, { message: 'Дор хаяж 3 -н оруулна уу!' }),
});
