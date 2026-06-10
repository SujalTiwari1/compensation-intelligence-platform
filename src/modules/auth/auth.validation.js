import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2).max(50),

  email: z.string().trim().email(),

  password: z
    .string()
    .min(8)
    .max(32)
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d).+$/,
      "Password must contain letters and numbers",
    ),
});

export const loginSchema = z.object({
  email: z.string().email(),

  password: z.string().min(1),
});
