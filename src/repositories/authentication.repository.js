import { connection } from "../database/db.js";
import bcrypt from 'bcrypt';
import { serverErrorResponse } from "../common/responses.js";

async function validateUser(res, email, password) {

    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);

        return user;
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function verifyUser(res, email, name) {
    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1 OR name = $2;', [email, name]);

        return user;
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function insertUser(res, name, email, password) {
    try {
        const newUser = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);

        return newUser;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function verifySession(res, userId) {
    try {
        const session = await connection.query('SELECT * FROM sessions WHERE user_id = $1 AND valid = true;', [userId]);

        return session
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function updateSession(res, userId, token) {
    try {
        const newSession = await connection.query('UPDATE sessions SET token = $1 WHERE user_id = $2;', [token, userId]);

        return newSession;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

async function insertSession(res, userId, token) {
    try {
        const newSession = await connection.query('INSERT INTO sessions (user_id, token) VALUES ($1, $2);', [userId, token]);

        return newSession;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    validateUser,
    verifyUser,
    insertUser,
    insertSession,
    verifySession,
    updateSession,
};