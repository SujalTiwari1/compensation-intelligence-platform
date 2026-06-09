import { companyService } from "./company.service.js";

import { asyncHandler } from "../../utils/asyncHandler.js";

import { successResponse } from "../../utils/api-response.js";

export const getCompanies = asyncHandler(async (req, res) => {
  const companies = await companyService.getAllCompanies();

  return successResponse(res, companies, "Companies fetched successfully");
});

export const getCompanyById = asyncHandler(async (req, res) => {
  const company = await companyService.getCompanyById(req.params.id);

  return successResponse(res, company, "Company fetched successfully");
});

export const createCompany = asyncHandler(async (req, res) => {
  const company = await companyService.createCompany(req.body);

  return successResponse(res, company, "Company created successfully", 201);
});

export const deleteCompany = asyncHandler(async (req, res) => {
  await companyService.deleteCompany(req.params.id);

  return successResponse(res, null, "Company deleted successfully");
});
