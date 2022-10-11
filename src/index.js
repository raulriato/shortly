import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/status', (req, res) => res.status(200).send('ok'));

app.listen(process.env.PORT, () => console.log(`listening on port ${process.env.PORT}`));