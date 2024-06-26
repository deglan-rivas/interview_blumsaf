import { z } from 'zod';

// id.value accepts null because of results from randomuser API
export const RandomUserSchema = z.object({
  name: z.object({
    title: z.string(),
    first: z.string(),
    last: z.string(),
  }),
  phone: z.string(),
  id: z.object({
    name: z.string(),
    value: z.string().nullable(),
  }),
});

export const RandomUsersSchema = z.array(RandomUserSchema);
