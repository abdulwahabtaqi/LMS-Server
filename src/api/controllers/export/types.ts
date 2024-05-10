import { ExportTypes } from "@prisma/client";

export interface ExportPaperRequest {
    isPracticeMode: boolean;
    schoolId: string;
    gradeId: string;
    subjectId: string;
    topicId: string;
    subTopicId: string;
    mcqQuestionQuantity: number;
    mcqDifficultyLevel: DifficultyLevel;
    shortQuestionQuantity: number;
    shortQuestionDifficultyLevel: DifficultyLevel;
    longQuestionQuantity: number;
    longQuestionDifficultyLevel: DifficultyLevel;
    fillInTheBlanksQuantity: number;
    fillInTheBlanksDifficultyLevel: DifficultyLevel;
    multiFillInTheBlanksQuantity: number;
    multiFillInTheBlanksDifficultyLevel: DifficultyLevel;
    multipleShortQuantity: number;
    multipleShortDifficultyLevel: DifficultyLevel;
    sequenceQuantity: number;
    sequenceDifficultyLevel: DifficultyLevel;
    multipleTrueFalseQuantity: number;
    multipleTrueFalseDifficultyLevel: DifficultyLevel;
    multipleQuestionV2Quantity: number;
    multipleQuestionV2DifficultyLevel: DifficultyLevel;
    type: QuestionType[];
    MCQVisible: boolean;
    shortQuestionVisible: boolean;
    longQuestionVisible: boolean;
    fillInTheBlanksVisible:boolean;
    multiFillInTheBlanksVisible:boolean;
    multipleShortVisible:boolean;
    sequenceVisible:boolean;
    multipleTrueFalseVisible:boolean;
    multipleQuestionV2Visible:boolean;
    exportMode: string;
}

export enum QuestionType {
    MCQ = "MCQ",
    SHORT = "SHORT",
    MULTIPLSHORT = "MULTIPLSHORT",
    FILLINTHEBLANK = "FILLINTHEBLANK",
    LONG = "LONG"
}

export enum DifficultyLevel {
    EASY = "EASY",
    MEDIUM = "MEDIUM",
    HARD = "HARD"
}
export interface ReservedQuestionAsPractice {
    questionIds: string[];
    questionMode:string;
    name:string
}