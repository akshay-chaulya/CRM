import { passKey } from "../config/index.js";
import * as authRepository from "../repositories/auth.repository.js";
import AppError from "../utils/AppError.js";
import { createToken } from "../utils/jwt.js";

export const createAdmin = async (data, givenPassKey) => {
  const isValidPassKey = givenPassKey === passKey;
  if (!isValidPassKey) {
    throw new AppError(
      "Empty or invalid passkey provided for admin creation in authorization header",
      401
    );
  }
  const user = await authRepository.findUserByEmailRole(data.email, "admin");
  if (user) {
    throw new AppError("User already exists with this email as admin", 400);
  }
  return await authRepository.createUser({ ...data, role: "admin" });
};

export const createStaff = async (data, user) => {
  const added_by = {
    id: user.id,
    name: user.name,
  };
  const existingUser = await authRepository.findUserByEmailRole(
    data.email,
    data.role || "staff"
  );
  if (existingUser) {
    throw new AppError("User already exists with this email", 400);
  }

  return await authRepository.createUser({ ...data, added_by });
};

export const login = async ({ email, password }, role) => {
  const user = await authRepository.findUserByEmailRole(email, role);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new AppError("Invalid password", 401);
  }
  const token = createToken(user);
  return { token, data: user };
};

export const updateStaff = async (id, { email, password, role, name }) => {
  const user = await authRepository.findUserByIdRole(id, "staff");
  if (!user) {
    throw new AppError("Staff not found", 404);
  }

  // Remove undefined fields
  const updateData = {};
  if (email !== undefined) updateData.email = email;
  if (password !== undefined) updateData.password = password;
  if (role !== undefined) updateData.role = role;
  if (name !== undefined) updateData.name = name;

  return await authRepository.updateUser(id, updateData);
};

export const deleteStaff = async (id) => {
  const user = await authRepository.findUserById(id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return await authRepository.deleteUser(id);
};

export const getAllStaffs = async () => {
  const staffs = await authRepository.findAll("staff");
  if (!staffs) {
    throw new AppError("No staff found", 404);
  }
  return staffs;
};
