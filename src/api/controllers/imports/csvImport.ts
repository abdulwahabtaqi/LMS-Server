import csvParser from 'csv-parser';
import { Request, Response } from 'express';
import fs from 'fs';




export const CsvImportHandler = (req:Request,res:Response) => {
    const csvData: any[] = [];
    const buffer = req?.file?.buffer?.toString();
    fs.createReadStream(buffer as string)
        .pipe(csvParser())
        .on('data', (row) => {
            csvData?.push(row);
        })
        .on('end', () => {
            console.log(csvData);
            res.send('File uploaded and parsed successfully.');
        });
}