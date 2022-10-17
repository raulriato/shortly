import { conflictResponse, unauthorizedResponse, unprocessableResponse } from "../common/responses.js";
import { validateUser, verifyUser } from "../repositories/authentication.repository.js";
import { signInSchema, signUpSchema } from "../schemas/authentication.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";
import bcrypt from 'bcrypt';

async function signUpMiddleware(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const messages = await validateSchema(signUpSchema, {
        name,
        email,
        password,
        confirmPassword
    });

    if (messages) {
        return unprocessableResponse(res, messages);
    };

    const newUser = await verifyUser(email, name);

    if (newUser.rowCount > 0) {
        return conflictResponse(res, 'invalid information');
    };

    res.locals.signUp = {
        name,
        email,
        password
    };

    next();
}

async function signInMiddleware(req, res, next) {
    const { email, password } = req.body;

    const messages = await validateSchema(signInSchema, { email, password });
    if (messages) {
        return unprocessableResponse(res, messages);
    };

    const user = await validateUser(email, password);

    const isValidPassword = bcrypt.compareSync(password, user.rows[0].password);

    if (user.rowCount === 0 || !isValidPassword) {
        return unauthorizedResponse(res, 'invalid information');
    };

    res.locals.signIn = {
        userId: user.rows[0].id,
        userName: user.rows[0].name
    };

    next();
};

export {
    signUpMiddleware,
    signInMiddleware
}