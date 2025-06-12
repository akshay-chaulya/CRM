import { z } from "zod";
import {
  name,
  email,
  phone,
} from "./sharedSchemas.js";


const client_id = z.string().min(3, "Client ID must be at least 3 characters");
const status = z.enum(["Active", "Inactive"]).optional();
const call_type = z.enum(["Hot Call", "Cold Call", "Warm Call"]).optional();
const company_name = z.string().min(2, "Company name is required");
const industry_type = z.string().min(2, "Industry type is required");
const remarks = z.array(z.string()).optional();
const schedule = z.coerce.date({ invalid_type_error: "Invalid date" }).optional();
const address = z.string().nonempty("Address is required").optional();

export const clientRegisterSchema = z
  .object({
    name,
    email,
    phone,
    client_id,
    address: address.optional(),
    call_type,
    status,
    company_name,
    industry_type,
    schedule,
    remarks,
  })
  .strip();

export const clientUpdateSchema = z
  .object({
    name: name.optional(),
    client_id: z.string().optional(),
    email: email.optional(),
    phone: phone.optional(),
    address: address.optional(),
    call_type: call_type.optional(),
    status: status.optional(),
    schedule: schedule.optional(),
    company_name: company_name.optional(),
    industry_type: industry_type.optional(),
    remarks: remarks.optional(),
  })
  .strip();
