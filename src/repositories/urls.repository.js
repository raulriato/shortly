import { serverErrorResponse } from "../common/responses.js";
import { connection } from "../database/db.js";

async function insertUrl(res, url, shortUrl, userId) {
    try {
        const newUrl = await connection.query('INSERT INTO urls (url, short_url, user_id) VALUES ($1, $2, $3);', [url, shortUrl, userId]);

        return newUrl;
    } catch (error) {
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
};

async function getUrl(res, shortUrl) {
    try {
        const url = await connection.query('SELECT id, url FROM urls WHERE short_url = $1;', [shortUrl]);

        return url;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function getUserUrls(res, userId) {
    try {
        const urlsStats = await connection.query(`SELECT urls.id, urls.short_url AS "shortUrl", urls.url, COUNT(visits.id) AS "visitCount"
        FROM urls
        LEFT JOIN visits ON urls.id = visits.url_id
        WHERE urls.user_id = $1
        GROUP BY urls.id;`, [userId]);

        return urlsStats;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function deleteUrl(res, urlId) {
    try {
        const deletedUrl = await connection.query('DELETE FROM urls WHERE id = $1;', [urlId]);

        return deletedUrl;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function getUrlById(res, urlId) {
    try {
        const url = await connection.query('SELECT * FROM urls WHERE id = $1;', [urlId]);

        return url;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    insertUrl,
    selectUrl,
    getUrl,
    getUserUrls,
    deleteUrl,
    getUrlById
}