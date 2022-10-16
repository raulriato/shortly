import { unauthorizedResponse, unprocessableResponse } from "../common/responses.js";
import { isValidSignIn } from "../repositories/authentication.repository.js";
import { signInSchema } from "../schemas/authentication.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";

async function signInMiddleware(req, res, next) {
    const { email, password } = req.body;

    const messages = validateSchema(signInSchema, { email, password });
    if (messages) {
        return unprocessableResponse(res, messages);
    };

    if (!isValidSignIn(email)) {
        return unauthorizedResponse(res, 'invalid information');
    };

    res.locals.signIn = { email, password };

    next();
};