import { Router } from "express";
import authRouter from "./auth.route.js";
import clientRouter from "./client.route.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/client", clientRouter);

export default router;
