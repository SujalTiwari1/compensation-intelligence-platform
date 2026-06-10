import { z } from "zod";

export const companyAnalyticsSchema = z.object({
  companyId: z.coerce.number().int().positive(),
});

//benchamrk validation

export const benchmarkSchema = z.object({
  roleId: z.coerce.number().int().positive(),

  levelId: z.coerce.number().int().positive(),

  locationId: z.coerce.number().int().positive(),

  currentCompensation: z.coerce.number().positive(),
});

//company-comparison validation

export const companyComparisonSchema =
  z.object({
    companyA: z.coerce
      .number()
      .int()
      .positive(),

    companyB: z.coerce
      .number()
      .int()
      .positive(),
  });

  //dahboard validation
  
  export const dashboardSchema =
  z.object({
    page: z.coerce
      .number()
      .int()
      .positive()
      .default(1),

    limit: z.coerce
      .number()
      .int()
      .positive()
      .max(50)
      .default(10),
  });