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

export {
    insertVisit
}