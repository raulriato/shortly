import { conflictResponse } from "../common/responses.js";
import { verifyUrl } from "../repositories/urls.repository.js";
import { urlSchema } from "../schemas/url.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";


async function urlMiddleware(req, res, next) {
    const { url } = req.body;

    const messages = validateSchema(urlSchema, { url });

    if (messages) {
        return unprocessableResponse(res, messages);
    };

    const verifiedUrl = await verifyUrl(res, url);

    if (verifiedUrl.rowCount > 0) {
        return conflictResponse(res, 'url already shortened');
    };

    res.locals.url = url;

    next();
};

export {
    urlMiddleware
}