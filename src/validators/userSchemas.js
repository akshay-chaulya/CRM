import z from "zod";
import {
  name,
  email,
  password,
  phone,
  role,
} from "./sharedSchemas.js";


const staff_id = z.string().min(3, "Staff ID must be at least 3 characters");

// Register schema
export const userRegisterSchema = z
  .object({
    name,
    email,
    password,
    phone,
    role: role.optional(), 
    staff_id: staff_id.optional(),
  })
  .strip()
  .superRefine((data, ctx) => {
    const effectiveRole = data.role || "staff";
    if (effectiveRole === "staff") {
      if (!data.staff_id) {
        ctx.addIssue({
          path: ["staff_id"],
          message: "Staff ID is required for staff role",
        });
      }
    }
  });

// Login schema
export const userLoginSchema = z.object({
  email,
  password,
}).strip();

// Update schema
export const userUpdateSchema = z.object({
  name: name.optional(),
  email: email.optional(),
  password: password.optional(),
  phone: phone.optional(),
  role: role.optional(),
  staff_id: staff_id.optional(),
}).strip();
