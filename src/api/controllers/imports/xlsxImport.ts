import { Request, Response } from 'express';
import XLSX from 'xlsx';
import fs from 'fs';
import { CreateFillInBlankInput, CreateLongQuestionsInput, CreateMCQsInput, CreateMultipleShortInput, CreateSequenceInput, CreateShortQuestionsInput, CsvFileInput, FileInput } from './types';
import { Question } from '../question/types';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from '../answer/types';
import { createLongQuestion, createMCQsQuestion, createMultiShortQuestion, createSequenceQuestion, createShortQuestion } from './mcqManagement';
import { singleChoiceQuestionTransformer } from './transformers/singleChoiceQuestionTransformer';
import { multipleChoiceQuestionTransformer } from './transformers/multipleChoiceQuestionTransformer';
import { fillInTheBlanksQuestionTransformer } from './transformers/fillInTheBlanksQuestionTransformer';
import { sequenceQuestionTransformer } from './transformers/sequenceQuestionTransformer';
import { multipleTrueFalseQuestionTransformer } from './transformers/multipleTrueFalseQuestionTransformer';
import { shortQuestionTransformer } from './transformers/shortQuestionTransformer';
import { longQuestionTransformer } from './transformers/longQuestionTransformer';
export const XlsxImportHandler = async (req: Request, res: Response) => {

    try {
        const { subTopicId } = req?.body as { subTopicId: string };

        console.log(subTopicId)
        const file = req.file
        const { path, originalname } = req.file as FileInput;
        if (!subTopicId) {
            return res.status(400).json({ status: false, message: 'subTopicId is required' });
        }

        console.log("path", path);
        if (!file) {
            return res.status(400).json({ status: false, message: 'No file uploaded' });
        }
        if (!path) {
            return res?.status(400)?.json({ status: false, message: 'No file path provided' });
        }
        const filePath = file.path;
        console.log("File uploaded at path:", filePath);


        const csvData: any[] = [];
        const workbook = XLSX?.readFile(path);
        const sheet_name = workbook?.SheetNames[0];
        const sheet = workbook?.Sheets[sheet_name];
        const data = XLSX?.utils?.sheet_to_json(sheet);

        const transformedMcq = singleChoiceQuestionTransformer(data);
        const mcq = CreateMCQs(transformedMcq, subTopicId);
        await mccDbCreation(mcq);

        const transformedMultiMcq = multipleChoiceQuestionTransformer(data);
        const multiMcq = CreateMCQs(transformedMultiMcq, subTopicId);
        await mccDbCreation(multiMcq);

        const transformedMultiFillInTheBlanksQuestion = fillInTheBlanksQuestionTransformer(data);
        const multiFillInTheBlanksQuestion = CreateFillInTheBlankQuestions(transformedMultiFillInTheBlanksQuestion, subTopicId);
        await multipleShortDbCreation(multiFillInTheBlanksQuestion);

        const transformedSequence = sequenceQuestionTransformer(data);
        const sequence = CreateSequenceQuestions(transformedSequence, subTopicId);
        await sequenceQuestions(sequence);

        const transformedMultipleTrueFalse = multipleTrueFalseQuestionTransformer(data);
        const multipleTrueFalse = CreateMultipleTrueFalseQuestions(transformedMultipleTrueFalse, subTopicId);
        await multipleShortDbCreation(multipleTrueFalse);

        const transformedShortQuestions = shortQuestionTransformer(data);

        const shortQuestions = createShortQuestions(transformedShortQuestions, subTopicId);
        console.log("transformedShortQuestions===>", transformedShortQuestions);
        await shortDbCreation(shortQuestions);

        const transformedLongQuestions = longQuestionTransformer(data);
        const longQuestions = createLongQuestions(transformedLongQuestions, subTopicId);
        await longDbCreation(longQuestions);


        // console.log("mcq===>", mcq);
        // console.log("multiMcq===>", multiMcq);
        // console.log("multiFillInTheBlanksQuestion===>", multiFillInTheBlanksQuestion);
        // console.log("sequence===>", sequence);
        // console.log("multipleTrueFalse===>", multipleTrueFalse);
        // console.log("shortQuestions===>", shortQuestions);
        // console.log("longQuestions===>", longQuestions);

        return res?.status(200)?.json({ status: true, message: 'Import Completed', data: csvData });
    } catch (error) {
        console.error(error);
        return res?.status(500)?.json({ status: false, message: 'Internal server error' });
    }
};


const deleteFile = async (path: string) => {
    try {
        await fs.unlink(path, (err) => {
            if (err) {
                console.error(err)
                return
            }
        })
    } catch (error) {
        console.error(error);
    }
}

const mccDbCreation = async (data: CreateMCQsInput) => {
    await createMCQsQuestion(data);
}
const shortDbCreation = async (data: CreateShortQuestionsInput) => {
    await createShortQuestion(data);
}
const sequenceQuestions = async (data: CreateSequenceInput) => {
    await createSequenceQuestion(data);
}
const multipleShortDbCreation = async (data: CreateMultipleShortInput) => {
    await createMultiShortQuestion(data);
}
const longDbCreation = async (data: CreateLongQuestionsInput) => {
    await createLongQuestion(data);
}

export const CreateMCQs = (csvData: any[], subTopicId: string) => {
    const MCQsQuestions: Question[] = [];
    const MCQsAnswers: Answer[] = [];
    const processedMCQIDs = new Set<string>();
    csvData?.filter(x => x?.Type === "MCQ")?.forEach(x => {

        const MCQID = x?.QuestionId;
        if (!processedMCQIDs?.has(MCQID)) {
            const question = {
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.DifficultyLevel?.toLowerCase(),
                difficultyLevel: x?.QuestionId.toUpperCase(),
                type: x?.Type,
                importId: uuidv4(),
                questionImage: x?.Answer,
                mcqImage: x?.IsMcqQuestionImage === "TRUE" ? true : false,
            } as Question;
            MCQsQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MCQ")?.forEach(y => {
                if (y?.QuestionId === MCQID) {
                    MCQsAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        importId: question?.importId,
                        answerImage: y?.AnswerImage || '',
                    } as Answer);
                }
            })
            processedMCQIDs?.add(MCQID);
        }
    });
    return { MCQsQuestions, MCQsAnswers } as CreateMCQsInput;
}
export const CreateSequenceQuestions = (csvData: any[], subTopicId: string) => {
    const SequenceQuestions: Question[] = [];
    const SequenceAnswers: Answer[] = [];
    const processedMCQIDs = new Set<string>();
    csvData?.filter(x => x?.Type === "SEQUENCE")?.forEach(x => {
        const MCQID = x?.QuestionId;
        if (!processedMCQIDs?.has(MCQID)) {
            const question = {

                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.DifficultyLevel?.toLowerCase(),
                difficultyLevel: x?.QuestionId.toUpperCase(),
                type: x?.Type,
                importId: uuidv4(),
                questionImage: x?.Answer,
                mcqImage: x?.IsMcqQuestionImage === "TRUE" ? true : false,
            } as Question;
            SequenceQuestions?.push(question);
            csvData?.filter(x => x?.Type === "SEQUENCE")?.forEach(y => {
                if (y?.QuestionId === MCQID) {
                    SequenceAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        importId: question?.importId,
                        answerImage: y?.AnswerImage || '',
                        sequenceNo: parseInt(y?.Counter),
                    } as Answer);
                }
            })
            processedMCQIDs?.add(MCQID);
        }
    });
    return { SequenceQuestions, SequenceAnswers } as CreateSequenceInput;
}
export const CreateMultipleShortQuestions = (csvData: any[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processedMultipleShortQuestionIds = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIPLSHORT")?.forEach(x => {
        const multipleSHortQuestionId = x?.QuestionId;
        if (!processedMultipleShortQuestionIds?.has(multipleSHortQuestionId)) {
            const question = {

                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.DifficultyLevel?.toLowerCase(),
                difficultyLevel: x?.QuestionId.toUpperCase(),
                type: x?.Type,
                importId: uuidv4(),
                answerCount: parseInt(x?.Counter),
                questionImage: x?.Answer || '',
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIPLSHORT")?.forEach(y => {
                if (y?.QuestionId === multipleSHortQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage || '',
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processedMultipleShortQuestionIds?.add(multipleSHortQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateMultipleShortInput;
}
export const CreateMultipleTrueFalseQuestions = (csvData: any[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processedMultipleShortQuestionIds = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIPLETRUEFALSE")?.forEach(x => {
        const multipleSHortQuestionId = x?.QuestionId;
        if (!processedMultipleShortQuestionIds?.has(multipleSHortQuestionId)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                answerCount: 0,
                questionImage: x?.Answer || '',
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIPLETRUEFALSE")?.forEach(y => {
                if (y?.QuestionId === multipleSHortQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage || '',
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processedMultipleShortQuestionIds?.add(multipleSHortQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateMultipleShortInput;
}
export const CreateFillInTheBlankQuestions = (csvData: any[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processFillInTheBlanksQuestions = new Set<string>();
    csvData?.filter(x => x?.Type === "FILLINTHEBLANK")?.forEach(x => {
        const fillInTheBlanksQuestionId = x?.QuestionId;
        if (!processFillInTheBlanksQuestions?.has(fillInTheBlanksQuestionId)) {
            const question = {
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.DifficultyLevel?.toLowerCase(),
                difficultyLevel: x?.QuestionId.toUpperCase(),
                type: x?.Type,
                importId: uuidv4(),
                answerCount: 0,
                questionImage: x?.Answer || '',
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "FILLINTHEBLANK")?.forEach(y => {
                if (y?.QuestionId === fillInTheBlanksQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage || '',
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processFillInTheBlanksQuestions?.add(fillInTheBlanksQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateFillInBlankInput;
}
export const CreateMultiFillInTheBlankQuestions = (csvData: any[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processFillInTheBlanksQuestions = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIFILLINTHEBLANK")?.forEach(x => {
        const fillInTheBlanksQuestionId = x?.QuestionId;
        if (!processFillInTheBlanksQuestions?.has(fillInTheBlanksQuestionId)) {
            const question = {
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.DifficultyLevel?.toLowerCase(),
                difficultyLevel: x?.QuestionId.toUpperCase(),
                type: x?.Type,
                importId: uuidv4(),
                answerCount: 0,
                questionImage: x?.Answer || '',
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIFILLINTHEBLANK")?.forEach(y => {
                if (y?.QuestionId === fillInTheBlanksQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Question,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage || '',
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processFillInTheBlanksQuestions?.add(fillInTheBlanksQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateFillInBlankInput;
}
export const createShortQuestions = (csvData: any[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    csvData?.filter(x => x?.Type === "SHORT")?.forEach(x => {

        const ImportUniqueId = uuidv4() + "-" + Math.random();
        ShortQuestions?.push({
            importId: ImportUniqueId,
            subTopicId: subTopicId,
            marks: parseInt(x?.Marks),
            question: x?.DifficultyLevel?.toLowerCase(),
            difficultyLevel: x?.QuestionId.toUpperCase(),
            questionImage: x?.Answer,
            type: x?.Type,
        } as Question);
        ShortAnswers?.push({
            answer: x?.Question,
            type: x?.Type,
            importId: ImportUniqueId,
        } as Answer);
    });
    return { ShortQuestions, ShortAnswers } as CreateShortQuestionsInput;
}
export const createLongQuestions = (csvData: any, subTopicId: any) => {
    console.log("csv", csvData)
    const LongQuestions: any[] = [];
    const LongAnswers: any[] = [];

    csvData?.filter((x: any) => x?.Type === "LONG")?.forEach((x: any) => {
        const ImportUniqueId = uuidv4();


        LongQuestions.push({
            importId: ImportUniqueId,
            subTopicId: subTopicId,
            marks: parseInt(x?.Marks),
            question: x?.DifficultyLevel?.toLowerCase(),
            difficultyLevel: x?.QuestionId.toUpperCase(),
            questionImage: x?.Answer,
            type: x?.Type,
        } as any);


        LongAnswers.push({
            answer: x?.Question,
            type: x?.Type,
            importId: ImportUniqueId,
        } as any);
    });

    return { LongQuestions, LongAnswers } as any;
}
