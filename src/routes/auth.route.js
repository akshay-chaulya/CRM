import { Router } from "express";
import validate from "../validators/validate.js";
import { loginValidator, registerValidator, updateValidator } from "../validators/validator.js";
import * as authController from "../controllers/auth.controller.js";
import checkRole from "../middleware/checkRole.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = Router();

router.post("/create-admin", validate(registerValidator), authController.createAdmin);
router.post("/create-staff", authMiddleware, checkRole("admin"),  validate(registerValidator), authController.createStaff);
router.post("/admin/login", validate(loginValidator), authController.adminLogin);
router.post("/staff/login", validate(loginValidator), authController.staffLogin);
router.put("/staff/update/:id", authMiddleware, checkRole("admin"), validate(updateValidator), authController.updateStaff);
router.delete("/staff/delete/:id", authMiddleware, checkRole("admin"), authController.deleteStaff);
router.get("/staffs", authController.getAllStaffs);

export default router;
