import { connection } from "../database/db.js";

async function verifyUserBySession(res, userId) {
    try {
        const user = connection.query('SELECT * FROM users WHERE id = $1;' [userId]);

        return user;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function validateSession(res, token) {
    try {
        const session = connection.query('SELECT * FROM sessions WHERE token = $1;', [token]);

        return session;
    } catch (error) {
        return serverErrorResponse(res, error)
    }
};

export {
    verifyUserBySession,
    validateSession
}