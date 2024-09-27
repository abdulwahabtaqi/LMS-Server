import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
import { v2 as cloudinary } from 'cloudinary';
import routes from './api/routes';
import bodyParser from 'body-parser'
import fileUpload from "express-fileupload"
const app = express();
app.use(json({ limit: '50mb' }));
app.use(express.json());
const port = process.env.PORT;
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.use('/api/v1', routes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});