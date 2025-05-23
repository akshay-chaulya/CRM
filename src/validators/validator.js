import zod from "zod";

const email = zod
  .string()
  .email("Invalid email format")
  .nonempty("Email is required");

const password = zod
  .string()
  .min(6, "Password must be at least 6 characters long")
  .nonempty("Password is required");

const name = zod
  .string()
  .min(3, "Name must be at least 3 characters long")
  .nonempty("Name is required");

const role = zod.enum(["admin", "staff"]);

// schema for user registration
export const registerValidator = zod.object({
  name: name,
  email: email,
  password: password,
  role: role.optional(),
}).strip();

// schema for user login
export const loginValidator = zod.object({
  email: email,
  password: password,
}).strip();

// schema for update user
export const updateValidator = zod.object({
  email: email.optional(),
  password: password.optional(),
  role: role.optional(),
  name: name.optional(),
}).strip();