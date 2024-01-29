export interface ExportPaperRequest {
    schoolId: string,
    gradeId: string,
    subjectId: string,
    topicId: string,
    subTopicId: string,
    mcqQuestionQuantity: number,
    mcqDifficultyLevel: DifficultyLevel,
    shortQuestionQuantity: number,
    shortQuestionDifficultyLevel: DifficultyLevel,
    longQuestionQuantity: number,
    longQuestionDifficultyLevel: DifficultyLevel,
    type: QuestionType[],
    MCQVisible: boolean,
    shortQuestionVisible: boolean,
    longQuestionVisible: boolean,
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