import { asyncHandler } from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/api-response.js";

import { analyticsService } from "./analytics.service.js";

export const getCompanyAnalytics = asyncHandler(async (req, res) => {
  const analytics = await analyticsService.getCompanyAnalytics(
    req.params.companyId,
  );

  return successResponse(
    res,
    analytics,
    "Company analytics fetched successfully",
  );
});
