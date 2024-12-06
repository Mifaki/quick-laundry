import { z } from 'zod';

export const UserSchema = z.object({
  fullName: z.string(),
  phoneNumber: z.string(),
  date: z.coerce.date(),
  session: z.string(),
  laundryMachineId: z.string(),
});

export type TUserSchema = z.infer<typeof UserSchema>;
