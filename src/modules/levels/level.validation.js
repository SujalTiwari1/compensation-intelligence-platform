import { z } from "zod";

export const createLevelSchema = z.object({
  name: z
    .string({
      required_error: "Level name is required",
      invalid_type_error: "Level name must be a string",
    })
    .trim()
    .min(2, "Level name must be at least 2 characters")
    .max(50, "Level name cannot exceed 50 characters")
    .regex(
      /^[a-zA-Z -]+$/,
      "Level name can only contain letters, numbers, spaces and hyphens"
    ),
});

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int("ID must be an integer")
    .positive("ID must be positive"),
});