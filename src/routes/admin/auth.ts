import express from "express";
const router = express.Router();
import authController from "../../controller/admin/auth";

router.post("/admin/signin", authController.signin);
router.post("/admin/signup", authController.signup);

export default router;
