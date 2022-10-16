import { conflictResponse, unauthorizedResponse, unprocessableResponse } from "../common/responses.js";
import { isValidSignIn, isValidSignUp } from "../repositories/authentication.repository.js";
import { signInSchema, signUpSchema } from "../schemas/authentication.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";

async function signUpMiddleware(req, res, next) {
    const { name, email, password, confirmPassword } = req.body;

    const messages = validateSchema(signUpSchema, {
        name,
        email,
        password,
        confirmPassword
    });
    if (messages) {
        return unprocessableResponse(res, messages);
    };

    if (!isValidSignUp) {
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

    const messages = validateSchema(signInSchema, { email, password });
    if (messages) {
        return unprocessableResponse(res, messages);
    };

    if (!isValidSignIn(email, password)) {
        return unauthorizedResponse(res, 'invalid information');
    };

    res.locals.signIn = { email, password };

    next();
};