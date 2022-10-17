import { connection } from "../database/db.js";
import bcrypt from 'bcrypt';
import { serverErrorResponse } from "../common/responses.js";

async function validateUser(email, password) {

    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);

        return user;
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function verifyUser(email) {
    try {
        const user = await connection.query('SELECT * FROM users WHERE email = $1;', [email]);

        return user;
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function insertUser(res, name, email, password) {
    console.log({
        email,
        name,
        password
    });
    try {
        const newUser = await connection.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3);', [name, email, password]);

        return newUser;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    validateUser,
    verifyUser,
    insertUser
};