import { z } from "zod";

export const createCompanySchema = z.object({
  name: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100),
});

export const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});