import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import helmet from 'helmet';
import { json } from 'body-parser';
const app = express();
import { v2 as cloudinary } from 'cloudinary';
import routes from './api/routes';
app.use(express.json());
// import bodyParser from 'body-parser'
// import fileUpload from "express-fileupload"
app.use(json({ limit: '50mb' }));

const port = process.env.PORT;
// app.use(cors({ origin: true, credentials: true }));
app.use(cors({ origin: true, credentials: true }));

app.use(helmet());


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