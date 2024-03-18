import { Request, Response, Router } from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { CsvImportHandler } from '../controllers/imports';
import { XlsxImportHandler } from '../controllers/imports/xlsxImport';
import { ReserveQuestionAsPractice } from '../controllers/export';
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/csvTempStorage');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = uuidv4() + path?.extname(file?.originalname);
    cb(null, uniqueFilename);
  }
});

const upload = multer({ storage: storage });

router.post('/csvImport', upload?.single('file'), XlsxImportHandler);


export default router;


