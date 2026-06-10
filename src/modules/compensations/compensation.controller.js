import { compensationService } from "./compensation.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

import {
  successResponse,
} from "../../utils/api-response.js";

export const createSubmission = asyncHandler(
  async (req, res) => {

    const submission =
      await compensationService.createSubmission(
        req.body,
        req.user.id
      );

    return successResponse(
      res,
      submission,
      "Compensation submitted successfully",
      201
    );
  }
);

export const getSubmissionById =
  asyncHandler(async (req, res) => {

    const submission =
      await compensationService.getSubmissionById(
        req.params.id
      );

    return successResponse(
      res,
      submission,
      "Submission fetched successfully"
    );
  });

export const getMySubmissions =
  asyncHandler(async (req, res) => {

    const submissions =
      await compensationService.getMySubmissions({
        userId: req.user.id,
        page: req.query.page,
        limit: req.query.limit,
      });

    return successResponse(
      res,
      submissions,
      "Submissions fetched successfully"
    );
  });