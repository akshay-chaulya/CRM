import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import checkRole from "../middleware/checkRole.js";
import authMiddleware from "../middleware/authmiddleware.js";
import validate from "../middleware/validate.js";
import { userLoginSchema, userRegisterSchema, userUpdateSchema } from "../validators/userSchemas.js";

const router = Router();

router.post(
  "/create-admin",
  validate(userRegisterSchema),
  authController.createAdmin
);

router.post(
  "/create-staff",
  authMiddleware,
  checkRole(["admin"]),
  validate(userRegisterSchema),
  authController.createStaff
);

router.post(
  "/admin/login",
  validate(userLoginSchema),
  authController.adminLogin
);

router.post(
  "/staff/login",
  validate(userLoginSchema),
  authController.staffLogin
);

router.put(
  "/staff/update/:id",
  authMiddleware,
  checkRole(["admin"]),
  validate(userUpdateSchema),
  authController.updateStaff
);

router.delete(
  "/staff/delete/:id",
  authMiddleware,
  checkRole(["admin"]),
  authController.deleteStaff
);

router.get("/staffs", authController.getAllStaffs);

export default router;
