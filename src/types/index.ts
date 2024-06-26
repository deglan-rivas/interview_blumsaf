import { z } from 'zod';
import { RandomUserSchema, RandomUsersSchema } from '../schemas/index';

export type RandomUser = z.infer<typeof RandomUserSchema>;
export type RandomUsers = z.infer<typeof RandomUsersSchema>;
