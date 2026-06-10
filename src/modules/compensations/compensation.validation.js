import { z } from "zod";

export const createCompensationSchema =
  z.object({

    companyId: z.coerce
      .number()
      .int()
      .positive(),

    roleId: z.coerce
      .number()
      .int()
      .positive(),

    levelId: z.coerce
      .number()
      .int()
      .positive(),

    locationId: z.coerce
      .number()
      .int()
      .positive(),

    baseSalary: z.coerce
      .number()
      .positive(),

    bonus: z.coerce
      .number()
      .min(0)
      .default(0),

    stock: z.coerce
      .number()
      .min(0)
      .default(0),
  });