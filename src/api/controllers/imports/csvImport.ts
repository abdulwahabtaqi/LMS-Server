import csvParser from 'csv-parser';
import { Request, Response } from 'express';
import fs from 'fs';
import { CreateFillInBlankInput, CreateLongQuestionsInput, CreateMCQsInput, CreateMultipleShortInput, CreateSequenceInput, CreateShortQuestionsInput, CsvFileInput, FileInput } from './types';
import { Question } from '../question/types';
import { v4 as uuidv4 } from 'uuid';
import { Answer } from '../answer/types';
import { createLongQuestion, createMCQsQuestion, createMultiShortQuestion, createSequenceQuestion, createShortQuestion } from './mcqManagement';
export const CsvImportHandler = (req: Request, res: Response) => {
    try {
        const { subTopicId } = req?.body as { subTopicId: string };
        const { path, originalname } = req.file as FileInput;
        console.log("path", path);
        if (!path) {
            return res?.status(400)?.json({ status: false, message: 'No file path provided' });
        }

        const csvData: CsvFileInput[] = [];

        fs?.createReadStream(path)
            ?.pipe(csvParser())
            ?.on('data', (row) => {
                csvData.push(row as CsvFileInput);
            })
            ?.on('end', async () => {
                const mcq = CreateMCQs(csvData, subTopicId);
                await mccDbCreation(mcq);
                 const sequence = CreateSequenceQuestions(csvData, subTopicId);
                await sequenceQuestions(sequence);
                const multipleShort = CreateMultipleShortQuestions(csvData, subTopicId);
                await multipleShortDbCreation(multipleShort);
                const multipleTrueFalse = CreateMultipleTrueFalseQuestions(csvData, subTopicId);
                await multipleShortDbCreation(multipleTrueFalse);
                const fillInTheBlanksQuestion = CreateFillInTheBlankQuestions(csvData, subTopicId);
                await multipleShortDbCreation(fillInTheBlanksQuestion);
                const multiFillInTheBlanksQuestion = CreateMultiFillInTheBlankQuestions(csvData, subTopicId);
                await multipleShortDbCreation(multiFillInTheBlanksQuestion);
                const multipleShortV2 = CreateMultipleShortV2Questions(csvData, subTopicId);
                await multipleShortDbCreation(multipleShortV2);
                // const shortQuestions = createShortQuestions(csvData, subTopicId);
                // await shortDbCreation(shortQuestions);
                // const longQuestions = createLongQuestions(csvData, subTopicId);
                // await longDbCreation(longQuestions);
               
                deleteFile(path);
            })
            ?.on('error', (error) => {
                console.error(error);
            });
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

export const CreateMCQs = (csvData: CsvFileInput[], subTopicId: string) => {
    const MCQsQuestions: Question[] = [];
    const MCQsAnswers: Answer[] = [];
    const processedMCQIDs = new Set<string>();
    csvData?.filter(x => x?.Type === "MCQ")?.forEach(x => {
        const MCQID = x?.QuestionId;
        if (!processedMCQIDs?.has(MCQID)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                mcqImage: x?.IsMcqQuestionImage === "TRUE" ? true : false,
            } as Question;
            MCQsQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MCQ")?.forEach(y => {
                if (y?.QuestionId === MCQID) {
                    MCQsAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        importId: question?.importId,
                        answerImage: y?.AnswerImage,
                    } as Answer);
                }
            })
            processedMCQIDs?.add(MCQID);
        }
    });
    return { MCQsQuestions, MCQsAnswers } as CreateMCQsInput;
}
export const CreateSequenceQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const SequenceQuestions: Question[] = [];
    const SequenceAnswers: Answer[] = [];
    const processedMCQIDs = new Set<string>();
    csvData?.filter(x => x?.Type === "SEQUENCE")?.forEach(x => {
        const MCQID = x?.QuestionId;
        if (!processedMCQIDs?.has(MCQID)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                mcqImage: x?.IsMcqQuestionImage === "TRUE" ? true : false,
            } as Question;
            SequenceQuestions?.push(question);
            csvData?.filter(x => x?.Type === "SEQUENCE")?.forEach(y => {
                if (y?.QuestionId === MCQID) {
                    SequenceAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        importId: question?.importId,
                        answerImage: y?.AnswerImage,
                        sequenceNo: parseInt(y?.Counter),
                    } as Answer);
                }
            })
            processedMCQIDs?.add(MCQID);
        }
    });
    return { SequenceQuestions, SequenceAnswers } as CreateSequenceInput;
}
export const CreateMultipleShortQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processedMultipleShortQuestionIds = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIPLSHORT")?.forEach(x => {
        const multipleSHortQuestionId = x?.QuestionId;
        if (!processedMultipleShortQuestionIds?.has(multipleSHortQuestionId)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                answerCount: parseInt(x?.Counter),
                questionImage: x?.QuestionImage,
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIPLSHORT")?.forEach(y => {
                if (y?.QuestionId === multipleSHortQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage,
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processedMultipleShortQuestionIds?.add(multipleSHortQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateMultipleShortInput;
}
export const CreateMultipleShortV2Questions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processedMultipleShortQuestionIds = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIPLSHORTV2")?.forEach(x => {
        const multipleSHortQuestionId = x?.QuestionId;
        if (!processedMultipleShortQuestionIds?.has(multipleSHortQuestionId)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                answerCount:  0,
                questionImage: x?.QuestionImage,
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIPLSHORTV2")?.forEach(y => {
                if (y?.QuestionId === multipleSHortQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage,
                        importId: question?.importId,
                        additional:x?.Additional,
                    } as Answer);
                }
            })
            processedMultipleShortQuestionIds?.add(multipleSHortQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateMultipleShortInput;
}
export const CreateMultipleTrueFalseQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
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
                questionImage: x?.QuestionImage,
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIPLETRUEFALSE")?.forEach(y => {
                if (y?.QuestionId === multipleSHortQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage,
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processedMultipleShortQuestionIds?.add(multipleSHortQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateMultipleShortInput;
}
export const CreateFillInTheBlankQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processFillInTheBlanksQuestions = new Set<string>();
    csvData?.filter(x => x?.Type === "FILLINTHEBLANK")?.forEach(x => {
        const fillInTheBlanksQuestionId = x?.QuestionId;
        if (!processFillInTheBlanksQuestions?.has(fillInTheBlanksQuestionId)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                answerCount: 0,
                questionImage: x?.QuestionImage,
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "FILLINTHEBLANK")?.forEach(y => {
                if (y?.QuestionId === fillInTheBlanksQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage,
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processFillInTheBlanksQuestions?.add(fillInTheBlanksQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateFillInBlankInput;
}
export const CreateMultiFillInTheBlankQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    const processFillInTheBlanksQuestions = new Set<string>();
    csvData?.filter(x => x?.Type === "MULTIFILLINTHEBLANK")?.forEach(x => {
        const fillInTheBlanksQuestionId = x?.QuestionId;
        if (!processFillInTheBlanksQuestions?.has(fillInTheBlanksQuestionId)) {
            const question = {
                importId: uuidv4(),
                subTopicId: subTopicId,
                marks: parseInt(x?.Marks),
                question: x?.Question,
                difficultyLevel: x?.DifficultyLevel,
                type: x?.Type,
                answerCount: 0,
                questionImage: x?.QuestionImage,
            } as Question;
            ShortQuestions?.push(question);
            csvData?.filter(x => x?.Type === "MULTIFILLINTHEBLANK")?.forEach(y => {
                if (y?.QuestionId === fillInTheBlanksQuestionId) {
                    ShortAnswers?.push({
                        answer: y?.Answer,
                        isCorrect: y?.IsCorrect,
                        type: y?.Type,
                        answerImage: y?.AnswerImage,
                        importId: question?.importId,
                    } as Answer);
                }
            })
            processFillInTheBlanksQuestions?.add(fillInTheBlanksQuestionId);
        }
    });

    return { ShortQuestions, ShortAnswers } as CreateFillInBlankInput;
}
export const createShortQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const ShortQuestions: Question[] = [];
    const ShortAnswers: Answer[] = [];
    csvData?.filter(x => x?.Type === "SHORT")?.forEach(x => {
        const ImportUniqueId = uuidv4() + "-" + Math.random();
        ShortQuestions?.push({
            importId: ImportUniqueId,
            subTopicId: subTopicId,
            marks: parseInt(x?.Marks),
            question: x?.Question,
            difficultyLevel: x?.DifficultyLevel,
            type: x?.Type,
        } as Question);
        ShortAnswers?.push({
            answer: x?.Answer,
            type: x?.Type,
            importId: ImportUniqueId,
        } as Answer);
    });
    return { ShortQuestions, ShortAnswers } as CreateShortQuestionsInput;
}
export const createLongQuestions = (csvData: CsvFileInput[], subTopicId: string) => {
    const LongQuestions: Question[] = [];
    const LongAnswers: Answer[] = [];
    csvData?.filter(x => x?.Type === "LONG")?.forEach(x => {
        const ImportUniqueId = uuidv4();
        LongQuestions?.push({
            importId: ImportUniqueId,
            subTopicId: subTopicId,
            marks: parseInt(x?.Marks),
            question: x?.Question,
            difficultyLevel: x?.DifficultyLevel,
            type: x?.Type,
        } as Question);
        LongAnswers?.push({
            answer: x?.Answer,
            type: x?.Type,
            importId: ImportUniqueId,
        } as Answer);
    });
    return { LongQuestions, LongAnswers } as CreateLongQuestionsInput;
}


