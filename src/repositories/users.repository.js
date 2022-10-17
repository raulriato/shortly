import { serverErrorResponse } from "../common/responses.js";
import { connection } from "../database/db.js";

async function selectUser(res, userId) {
    try {
        const userStats = await connection.query(`SELECT users.id, users.name, COUNT(visits.id) AS "visitCount"
      FROM users
      LEFT JOIN urls ON users.id = urls.user_id
      LEFT JOIN visits ON urls.id = visits.url_id
      WHERE users.id = $1
      GROUP BY users.id;`, [userId]);

        return userStats;
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function selectRanking(res) {
    try {
        const ranking = connection.query(`SELECT users.id, users.name, COUNT(urls.id) AS "linksCount", COUNT(visits.id) AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls.user_id
        LEFT JOIN visits ON urls.id = visits.url_id
        GROUP BY users.id
        ORDER BY "visitCount" DESC, "linksCount" DESC
        LIMIT 10;`);

        return ranking;
    } catch (error) {
        return serverErrorResponse(res, error);
    }
};

export {
    selectUser,
    selectRanking
};