import * as authService from "../services/auth.service.js";
import catchAsync from "../utils/catchAsync.js";
import { StatusCodes } from "http-status-codes";

export const createAdmin = catchAsync(async (req, res) => {
  const data = await authService.createAdmin(
    req.body,
    req.headers.authorization
  );
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Admin created successfully",
    data,
  });
});

export const createStaff = catchAsync(async (req, res) => {
  const data = await authService.createStaff(req.body, req.user);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "User registered successfully",
    data,
  });
});

export const staffLogin = catchAsync(async (req, res) => {
  const data = await authService.login(req.body, "staff");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "You are logged in successfully",
    ...data,
  });
});

export const adminLogin = catchAsync(async (req, res) => {
  const data = await authService.login(req.body, "admin");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "You are logged in successfully",
    ...data,
  });
});

export const updateStaff = catchAsync(async (req, res) => {
  const data = await authService.updateStaff(req.params.id, req.body);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Staff updated successfully",
    data,
  });
});

export const deleteStaff = catchAsync(async (req, res) => {
  const data = await authService.deleteStaff(req.params.id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Staff deleted successfully",
    data,
  });
});

export const getAllStaffs = catchAsync(async (req, res) => {
  const data = await authService.getAllStaffs();
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Staffs fetched successfully",
    data,
  });
});