import { Router } from "express";
import { signUp } from "../controllers/authentication.controller.js";
import { signUpMiddleware } from "../middlewares/authenticantion.middleware.js";

const router = Router();

router.post('/signup', signUpMiddleware, signUp);

export default router;