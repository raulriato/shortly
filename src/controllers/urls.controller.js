import { nanoid } from 'nanoid';
import { conflictResponse, createdResponse, notFoundResponse, okResponse } from '../common/responses.js';
import { insertUrl, selectUrl } from '../repositories/urls.repository.js';

async function createUrl(req, res) {
    const url = res.locals.url;
    const userId = res.locals.userId

    const shortUrl = nanoid();

    const insertedUrl = insertUrl(res, url, shortUrl, userId);

    if (insertedUrl.rowCount === 0) {
        return conflictResponse(res, 'unable to insert url');
    };

    return createdResponse(res, {shortUrl});
};

async function showUrl(req, res) {
    const { id } = req.params;
    
    const url = await selectUrl(res, id);

    if (url.rowCount === 0) {
        return notFoundResponse(res, 'NOT FOUND');
    };

    return okResponse(res, url.rows[0]);
}

export {
    createUrl,
    showUrl
}