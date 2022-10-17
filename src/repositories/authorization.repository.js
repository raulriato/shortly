import { connection } from "../database/db.js";

async function validateSession(res, token) {
    try {
        const session = await connection.query('SELECT * FROM sessions WHERE token = $1 AND valid = true;', [token]);

        return session;
    } catch (error) {
        return serverErrorResponse(res, error)
    }
};

export {
    validateSession
}