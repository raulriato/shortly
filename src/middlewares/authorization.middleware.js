import { unauthorizedResponse } from "../common/responses.js";
import { validateSession, verifyUserBySession } from "../repositories/authentication.repository.js";

async function authorizationMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
        return unauthorizedResponse(res, 'unauthorized');
    };

    const session = await validateSession(res, token);

    if (session.rowCount === 0) {
        return unauthorizedResponse(res, 'unauthorized');
    };

    const user = await verifyUserBySession(res, session.rows[0].user_id);

    if (user.rowCount === 0) {
        return unauthorizedResponse(res, 'unauthorized');
    };

    res.locals.user = {
        id: user.rows[0].id,
        name: user.rows[0].name
    };

    next();
};

export { authorizationMiddleware };