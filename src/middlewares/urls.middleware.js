import { unprocessableResponse } from "../common/responses.js";
import { urlSchema } from "../schemas/url.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";


async function urlMiddleware(req, res, next) {
    const { url } = req.body;

    const messages = validateSchema(urlSchema, { url });

    if (messages) {
        return unprocessableResponse(res, messages);
    };

    res.locals.url = url;

    next();
};

export {
    urlMiddleware
}