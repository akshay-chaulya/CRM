import catchAsync from "../utils/catchAsync.js";
import * as clientService from "../services/client.service.js";
import { StatusCodes } from "http-status-codes";

export const createClient = catchAsync(async (req, res) => {
  const data = await clientService.createClient(req.body, req.user);
  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "Client created successfully",
    data,
  });
});

export const updateClient = catchAsync(async (req, res) => {
  const data = await clientService.updateClient(req.params.id, req.body);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Client updated successfully",
    data,
  });
});

export const deleteClient = catchAsync(async (req, res) => {
  const data = await clientService.deleteClient(req.params.id);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Client deleted successfully",
    data,
  });
})

export const getAllClients = catchAsync(async (req, res) => {
  const data = await clientService.getAllClients(req.user);
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "Clients fetched successfully",
    data,
  });
});

