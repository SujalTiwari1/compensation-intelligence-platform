import bcrypt from "bcryptjs";

import { ApiError } from "../../utils/api-error.js";

import { authRepository } from "./auth.repository.js";

import { generateAccessToken } from "../../utils/jwt.js";

export const authService = {
  register: async (payload) => {
    const existingUser = await authRepository.findUserByEmail(payload.email);

    if (existingUser) {
      throw new ApiError(409, "Email already registered");
    }

    const hashedPassword = await bcrypt.hash(payload.password, 12);

    const user = await authRepository.createUser({
      ...payload,
      password: hashedPassword,
    });

    const token = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return {
      user,
      token,
    };
  },

  login: async ({ email, password }) => {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
      throw new ApiError(401, "Invalid credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new ApiError(401, "Invalid credentials");
    }

    const token = generateAccessToken({
      id: user.id,
      role: user.role,
    });

    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  },

  getCurrentUser: async (userId) => {
    return authRepository.findUserById(userId);
  },

  findUserWithPasswordByEmail: async (email) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },
};
