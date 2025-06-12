import { Router } from "express";
import * as clientController from "../controllers/client.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";
import validate from "../middleware/validate.js";
import {
  clientRegisterSchema,
  clientUpdateSchema,
} from "../validators/clientSchemas.js";

const router = Router();

router.post(
  "/create",
  authMiddleware,
  validate(clientRegisterSchema),
  clientController.createClient
);
router.put(
  "/update/:id",
  authMiddleware,
  validate(clientUpdateSchema),
  clientController.updateClient
);
router.delete("/delete/:id", authMiddleware, clientController.deleteClient);
router.get("/all", authMiddleware, clientController.getAllClients);

export default router;
