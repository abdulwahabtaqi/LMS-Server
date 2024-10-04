import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
import { v2 as cloudinary } from 'cloudinary';
import routes from './api/routes';


app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({
    limit: "20mb"
}));
app.use(json({ limit: '50mb' }));
app.use(helmet());

const port = process.env.PORT;
// app.use(cors({ origin: true, credentials: true }));

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