import { serverErrorResponse } from "../common/responses.js";
import { connection } from "../database/db.js";

async function insertVisit(res, urlId) {
    try {
        const newVisit = await connection.query('INSERT INTO visits (url_id) VALUES ($1);', [urlId]);

        return newVisit;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function deleteVisitsFromUrl(res, urlId) {
    try {
        const visits = await connection.query('DELETE FROM visits WHERE url_id = $1;', [urlId]);

        return visits;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

async function selectVisitsByUrl(res, urlId) {
    try {
        const visit = await connection.query('SELECT * FROM visits WHERE url_id = $1;', [urlId]);

        return visit;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

export {
    insertVisit,
    deleteVisitsFromUrl,
    selectVisitsByUrl
}