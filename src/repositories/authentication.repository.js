import { connection } from "../database/db.js";
import bcrypt from 'bcrypt';

async function isValidSignIn(email, password) {
    const user = await connection.query('SELECT * FROM users WHERE email = $1', [email]);

    if (user.rowCount === 0) {
        return false
    };

    const isValidPassword = bcrypt.compareSync(password, user.rows[0].password);

    return isValidPassword;
};

export { isValidSignIn };