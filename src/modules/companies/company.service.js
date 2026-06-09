import { companyRepository } from "./company.repository.js";
import { ApiError } from "../../utils/api-error.js";

export const companyService = {
  getAllCompanies: async (pagination) => {
    return companyRepository.findAll(pagination);
  },

  getCompanyById: async (id) => {
    const company = await companyRepository.findById(Number(id));

    if (!company) {
      throw new ApiError(404, "Company not found");
    }

    return company;
  },

  createCompany: async (payload) => {
    const existingCompany = await companyRepository.findByName(payload.name);

    if (existingCompany) {
      throw new ApiError(409, "Company already exists");
    }

    return companyRepository.create({
      name: payload.name,
      normalizedName: payload.name.trim().toLowerCase(),
    });
  },

  deleteCompany: async (id) => {
    await companyService.getCompanyById(id);

    return companyRepository.delete(Number(id));
  },
};
