import { z } from "zod";

export const companyAnalyticsSchema = z.object({
  companyId: z.coerce.number().int().positive(),
});
