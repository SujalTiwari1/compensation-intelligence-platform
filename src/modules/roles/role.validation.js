import { z } from "zod";

export const createRoleSchema = z.object({
  name: z
    .string()
    .min(2, "Role name must be at least 2 characters")
    .max(100),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});