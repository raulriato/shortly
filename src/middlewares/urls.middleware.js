import { notFoundResponse, serverErrorResponse, unauthorizedResponse, unprocessableResponse } from "../common/responses.js";
import { getUrlById } from "../repositories/urls.repository.js";
import { urlSchema } from "../schemas/url.schema.js";
import { validateSchema } from "./middlewaresHelpers/schemas.validation.js";


async function urlInsertMiddleware(req, res, next) {
    const { url } = req.body;

    const messages = validateSchema(urlSchema, { url });

    if (messages) {
        return unprocessableResponse(res, messages);
    };

    res.locals.url = url;

    next();
};

async function urlDeleteMiddleware(req, res, next) {
    const { id } = req.params;
    const userId = res.locals.userId;

    try {
        const url = await getUrlById(res, id);

        if(url.rowCount === 0) {
            return notFoundResponse(res, 'not found');
        };

        if (url.rows[0].user_id !== userId) {
            return unauthorizedResponse(res, 'unauthorized');
        };

        res.locals.urlId = id;

        next();
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    urlInsertMiddleware,
    urlDeleteMiddleware
}