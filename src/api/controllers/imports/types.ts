import { Answer } from "../answer/types";
import { Question } from "../question/types";

export interface FileInput {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
export interface CsvFileInput {
    Type: string;
    DifficultyLevel: string;
    Question: string;
    Answer: string;
    IsCorrect: string;
    MCQID: string;
    Marks: string;
}

export interface CreateMCQsInput {
    MCQsQuestions: Question[];
    MCQsAnswers: Answer[];
}
export interface CreateQuestionsResponse {
    status: boolean;
    message: string;
    failed:FailedQuestionsAnswers
}

export interface FailedQuestionsAnswers {
    question: Question[];
    answer: Answer[];
}
export interface CreateShortQuestionsInput {
    ShortQuestions: Question[];
    ShortAnswers: Answer[];
}

export interface CreateLongQuestionsInput {
    LongQuestions: Question[];
    LongAnswers: Answer[];
}
