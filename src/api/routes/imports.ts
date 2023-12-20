import { NextFunction, Request, Response, Router } from 'express';
const router = Router();
import multer from 'multer';
import { ApiResponse } from '@/shared';
import { CsvImportHandler } from '../controllers/imports';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'),(req:Request,res:Response, next:NextFunction)=>{
 if(!req.file){
    return ApiResponse(false, "Please Upload a File", null, 400, res);
 }
 return next();
}, CsvImportHandler );



export default router;

