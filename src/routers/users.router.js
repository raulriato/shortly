import { Router } from "express";
import { getUser } from "../controllers/users.controller.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";

const router = Router();

router.use(authorizationMiddleware);

router.get('/users/me', getUser);

export default router;