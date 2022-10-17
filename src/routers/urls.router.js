import { Router } from "express";
import { createUrl, goToUrl, removeUrl, showUrl } from "../controllers/urls.controller.js";
import { authorizationMiddleware } from "../middlewares/authorization.middleware.js";
import { urlDeleteMiddleware, urlInsertMiddleware } from "../middlewares/urls.middleware.js";

const router = Router();

router.get('/urls/:id', showUrl);
router.get('/urls/open/:shortUrl', goToUrl);

router.use(authorizationMiddleware);
router.post('/urls/shorten', urlInsertMiddleware, createUrl);
router.delete('/urls/:id', urlDeleteMiddleware, removeUrl);

export default router;