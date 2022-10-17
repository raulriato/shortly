import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createdResponse, unauthorizedResponse } from '../common/responses.js';
import { insertUser } from '../repositories/authentication.repository.js';


async function signUp(req, res) {
    const { name, email, password } = res.locals.signUp;

    const hashPassword = bcrypt.hashSync(password, 12);

    const newUser = await insertUser(res, name, email, hashPassword);

    if(newUser.rowCount === 0) {
        return unauthorizedResponse(res, 'invalid information');
    };

    return createdResponse(res, 'ok');
};

export { signUp };