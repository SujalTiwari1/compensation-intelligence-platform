import { z } from "zod";

export const createLocationSchema = z.object({
  city: z
    .string({
      required_error: "City is required",
      invalid_type_error: "City must be a string",
    })
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z\s\-]+$/,
      "City can only contain letters, spaces and hyphens"
    ),

  country: z
    .string({
      required_error: "Country is required",
      invalid_type_error: "Country must be a string",
    })
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters")
    .regex(
      /^[a-zA-Z\s\-]+$/,
      "Country can only contain letters, spaces and hyphens"
    ),
});

export const idParamSchema = z.object({
  id: z.coerce
    .number()
    .int("ID must be an integer")
    .positive("ID must be positive"),
});