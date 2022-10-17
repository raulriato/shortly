import jwt from 'jsonwebtoken';
import { unauthorizedResponse } from "../common/responses.js";
import { validateSession } from "../repositories/authorization.repository.js";

async function authorizationMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    const verifiedToken = jwt.verify(token, 'SHORTLY');

    if (!verifiedToken) {
        return unauthorizedResponse(res, 'unauthorized');
    };

    const session = await validateSession(res, token);

    if (session.rowCount === 0) {
        return unauthorizedResponse(res, 'unauthorized');
    };

    res.locals.userId = verifiedToken.userId;

    next();
};

export { authorizationMiddleware };