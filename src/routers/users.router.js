import { Router } from "express";
import { getUser, listRanking } from "../controllers/users.controller.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";

const router = Router();

router.get('/ranking', listRanking);

router.use(authorizationMiddleware);
router.get('/users/me', getUser);

export default router;