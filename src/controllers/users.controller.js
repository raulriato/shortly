import { notFoundResponse, okResponse, serverErrorResponse } from "../common/responses.js";
import { getUserUrls } from "../repositories/urls.repository.js";
import { selectRanking, selectUser } from "../repositories/users.repository.js";

async function getUser(req, res) {
    const userId = res.locals.userId;

    try {
        const userStats = await selectUser(res, userId);

        const body = userStats.rows[0];

        if (userStats.rowCount === 0) {
            return notFoundResponse(res, 'user not found');
        };

        const userUrlsStats = await getUserUrls(res, userId);
        body.shortenedUrls = userUrlsStats.rows;

        return okResponse(res, body);
    } catch (error) {
        return serverErrorResponse(res, error);
    };
};

async function listRanking(req, res) {
    try {
        const ranking = await selectRanking(res);

        if (ranking.rowCount === 0) {
            return notFoundResponse(res, 'ranking not found');
        };

        return okResponse(res, ranking.rows);
    } catch (error) {
        return serverErrorResponse(res, error);
    }
}

export {
    getUser,
    listRanking
};