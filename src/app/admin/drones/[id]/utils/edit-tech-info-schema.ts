import z from 'zod';
export const EditDroneTechInfoSchema = z.object({
  weight: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
  maxSpeed: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
  operatingTemperature: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
  dimensions: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
  maxWindResistance: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
  Battery: z.string().min(1, { message: 'Заавал утга оруулах ёстой!' }),
});
