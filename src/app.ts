import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
app.use(json({ limit: '50mb' }));
app.use(express.json());
const port = process.env.PORT;
app.use(cors({ origin: true, credentials: true }));
app.use(helmet());
import routes from './api/routes';

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1',routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});