import { Router } from "express";
import { createUrl, showUrl } from "../controllers/urls.controller.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { urlMiddleware } from "../middlewares/urls.middleware.js";

const router = Router();

router.get('/urls/:id', showUrl);

router.use(authorizationMiddleware);
router.use(urlMiddleware);
router.post('/urls/shorten', createUrl);

export default router;