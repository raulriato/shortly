import { nanoid } from 'nanoid';
import { conflictResponse, createdResponse, notFoundResponse, okResponse } from '../common/responses.js';
import { getUrl, insertUrl, selectUrl } from '../repositories/urls.repository.js';
import { insertVisit } from '../repositories/visits.repository.js';

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
};

async function goToUrl(req, res) {
    const { shortUrl } = req.params;

    const url = await getUrl(res, shortUrl);

    if(url.rowCount === 0) {
        return notFoundResponse(res, 'url not found');
    };

    const visit = await insertVisit(res, url.rows[0].id);

    if (visit.rowCount === 0) {
        return conflictResponse(res, 'unable to update visits value');
    };

    return res.redirect(url.rows[0].url);
}

export {
    createUrl,
    showUrl,
    goToUrl
}