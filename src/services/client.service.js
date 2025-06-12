import { id } from "zod/v4/locales";
import * as clientRepository from "../repositories/client.repository.js";
import { StatusCodes } from "http-status-codes";
import * as authRepository from "../repositories/auth.repository.js";

export const createClient = async (data, user) => {
    const added_by = {
        id: user.id,
        name: user.name,
    }
    const existingClient = await clientRepository.findClientByEmail(data.email);
    if (existingClient) {
        throw new AppError("Client already exists with this email", StatusCodes.BAD_REQUEST);
    }
    
    return await clientRepository.createClient({...data, added_by});
};

export const updateClient = async (id, data) => {
    const client = await clientRepository.getClientById(id);
    if (!client) {
        throw new AppError("Client not found", StatusCodes.NOT_FOUND);
    }
    return await clientRepository.updateClient(id, data);
};

export const deleteClient = async (id) => {
    const client = await clientRepository.getClientById(id);
    if (!client) {
        throw new AppError("Client not found", StatusCodes.NOT_FOUND);
    }
    return await clientRepository.deleteClient(id);
};

// This will fetch clients by user role admin have access all data but staff only have access to their own
export const getAllClients = async (user) => {
    console.log(user);
    if (user.role === "staff") {
        return await clientRepository.getAllClientsByAddedBy(user.id);
    } else {
        return await clientRepository.getAllClients();
    }
};
