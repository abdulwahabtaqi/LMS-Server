import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
// import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
import { v2 as cloudinary } from 'cloudinary';

app.use(cors({
    // origin: "https://lms-client-hazel.vercel.app",
    origin: true,
    // origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(json({ limit: '50mb' }));
app.use(express.json({
    limit: "20mb"
}));
const port = process.env.PORT || 4000;

// app.use(helmet());
import routes from './api/routes';




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