import { z } from 'zod';

export const UserSchema = z.object({
  fullName: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phoneNumber: z.string().regex(/^[0-9]{10,12}$/, { message: 'Invalid phone number' }),
  date: z.date(),
  session: z.string(),
  laundryMachineId: z.string(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
