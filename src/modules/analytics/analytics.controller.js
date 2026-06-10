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

//benchamrk controller

export const getBenchmark =
  asyncHandler(async (req, res) => {

    const result =
      await analyticsService.getBenchmark(
        req.validatedQuery
      );

    return successResponse(
      res,
      result,
      "Benchmark analysis completed"
    );
  });
