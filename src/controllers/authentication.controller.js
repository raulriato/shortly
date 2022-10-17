import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createdResponse, unauthorizedResponse } from '../common/responses.js';
import { insertSession, insertUser, updateSession, verifySession } from '../repositories/authentication.repository.js';


async function signUp(req, res) {
    const { name, email, password } = res.locals.signUp;

    const hashPassword = bcrypt.hashSync(password, 12);

    const newUser = await insertUser(res, name, email, hashPassword);

    if (newUser.rowCount === 0) {
        return unauthorizedResponse(res, 'invalid information');
    };

    return createdResponse(res, 'ok');
};

async function signIn(req, res) {
    const { userId } = res.locals.signIn;

    const token = jwt.sign(
        {
            userId
        },
        'SHORTLY'
    );

    const activeSession = await verifySession(res, userId);

    if (activeSession.rowCount > 0) {
        const updatedSession = await updateSession(res, userId, token);

        if (updatedSession.rowCount === 0) {
            return unauthorizedResponse(res, 'invalid information');
        };
    } else {
        const newSession = await insertSession(res, userId, token);

        if (newSession.rowCount === 0) {
            return unauthorizedResponse(res, 'invalid information');
        };
    };

    return createdResponse(res, { token });
}

export {
    signUp,
    signIn
};