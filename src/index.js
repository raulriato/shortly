import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authenticationRouter from './routers/authentication.router.js';
import urlsRouter from './routers/urls.router.js';
import usersRouter from './routers/users.router.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authenticationRouter);
app.use(usersRouter);
app.use(urlsRouter);

app.get('/status', (req, res) => res.status(200).send('ok'));

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));