import { email } from "zod/v4";
import User from "../models/user.model.js";

export const createUser = async (userData) => {
  const user = new User(userData);
  await user.save();
  return user.toJSON();
};

export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const findUserById = async (id) => {
  return await User.findById(id);
};

export const findUserByEmailRole = async (email, role) => {
  return await User.findOne({ email, role });
};

export const findUserByIdRole = async (id, role) => {
  return await User.findOne({ _id: id, role });
}

export const updateUser = async (id, updateData) => {
  return await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};

export const findAll = async (role) => {
  return await User.find({ role }).select("-password");
};
