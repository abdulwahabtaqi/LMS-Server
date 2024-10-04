import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
import { v2 as cloudinary } from 'cloudinary';
import routes from './api/routes';
app.use(express.json({
    limit: "20mb"
}));
app.use(json({ limit: '50mb' }));

const port = process.env.PORT;
// app.use(cors({ origin: true, credentials: true }));


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow credentials if needed
}));

// Handle preflight requests
app.options('*', cors());



app.use(helmet());


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.use('/api/v1', routes)



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});