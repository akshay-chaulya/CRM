import { email } from "zod/v4";
import Client from "../models/client.model.js";

export const createClient = async (data) => {
    return await Client.create(data);
};

export const findClientByEmail = (email) => {
    return Client.findOne({ email });
};

export const updateClient = async (id, data) => {
    return await Client.findOneAndUpdate({ _id: id }, data, { new: true });
};

export const deleteClient = async (id) => {
    return await Client.findByIdAndDelete(id);
};

export const getClientById = async (id) => {
    return await Client.findById(id);
};

export const getAllClientsByAddedBy = async (id) => {
    return await Client.find({ "added_by.id": id });
};

export const getAllClients = async () => {
    return await Client.find();
}