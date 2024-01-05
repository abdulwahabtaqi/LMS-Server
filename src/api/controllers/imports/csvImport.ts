import csvParser from 'csv-parser';
import { Request, Response } from 'express';
import fs from 'fs';
import { CreateMCQsInput, CsvFileInput, FileInput } from './types';
import { Question } from '../question/types';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from '../answer/types';
export const CsvImportHandler = (req: Request, res: Response) => {
  try {
    const { subTopicId } = req?.body as { subTopicId: string };
    const { path, originalname } = req.file as FileInput;
    console.log("path", path);
    if (!path) {
      return res.status(400).json({ status: false, message: 'No file path provided' });
    }

    const csvData: CsvFileInput[] = [];
   
    fs?.createReadStream(path)
      ?.pipe(csvParser())
      ?.on('data', (row) => {
        csvData.push(row as CsvFileInput);
      })
      ?.on('end', () => {
        const mcq = CreateMCQs(csvData, subTopicId);
        console.log("mcq", mcq);
        // console.log("csvData======", csvData);
      })
      ?.on('error', (error) => {
        console.error(error);
      });
      
      return res.status(200).json({ status: true, message: 'Upload successful', data: csvData });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
};


export const CreateMCQs = (csvData: CsvFileInput[], subTopicId: string) => {
    const MCQsQuestions: Question[] = [];
    const MCQsAnswers: Answer[] = [];
    const processedMCQIDs = new Set<string>();
    csvData?.filter(x => x?.Type === "MCQ")?.forEach(x => {
        const MCQID = x?.MCQID; 
        if (!processedMCQIDs.has(MCQID)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
            } as Question;
            MCQsQuestions.push(question);
            csvData?.filter(x => x?.Type === "MCQ")?.forEach(y=>{
                if(y?.MCQID === MCQID){
                    MCQsAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processedMCQIDs.add(MCQID);
        }
    });
    
  return {MCQsQuestions, MCQsAnswers} as CreateMCQsInput;
}

export const createShortQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    csvData?.filter(x => x?.Type === "SHORT")?.forEach(x => {
        ShortQuestions?.push({
            importId: uuidv4(),
            subTopicId: subTopicId,
            marks: parseInt(x?.Marks),
            question: x?.Question,
            difficultyLevel: x?.DifficultyLevel,
            type: x?.Type,
        } as Question);
        
    });
    return ShortQuestions;
}


