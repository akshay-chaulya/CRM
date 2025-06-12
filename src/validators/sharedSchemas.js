import z from "zod";

export const name = z.string().min(3, "Name must be at least 3 characters").nonempty("Name is required");
export const email = z.string().email("Invalid email format").nonempty("Email is required");
export const password = z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required");
export const phone = z.string().length(10, "Phone must be exactly 10 digits").nonempty("Phone is required");
export const role = z.enum(["admin", "staff"]).optional();

