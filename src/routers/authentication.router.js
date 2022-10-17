import { Router } from "express";
import { signIn, signUp } from "../controllers/authentication.controller.js";
import { signInMiddleware, signUpMiddleware } from "../middlewares/authenticantion.middleware.js";

const router = Router();

router.post('/signup', signUpMiddleware, signUp);
router.post('/signin', signInMiddleware, signIn);

export default router;