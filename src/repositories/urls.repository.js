import { serverErrorResponse } from "../common/responses.js";
import { connection } from "../database/db.js";

async function verifyUrl(res, url) {
    try {
        const existingUrl = await connection.query('SELECT * FROM urls WHERE url = $1;' [url]);

        return existingUrl;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function insertUrl(res, url, shortUrl, userId) {
    try {
        const newUrl = await connection.query('INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3);', [url, shortUrl, userId]);

        return newUrl;
    } catch (error) {
        console.log('insert url');
        return serverErrorResponse(res, error);
    }
};

async function selectUrl(res, id) {
    try {
        const url = await connection.query('SELECT id, short_url AS "shortUrl", url FROM urls WHERE id = $1;', [id]);

        return url;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    verifyUrl,
    insertUrl,
    selectUrl
}