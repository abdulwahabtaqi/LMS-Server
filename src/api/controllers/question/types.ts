export interface Question {
     subTopicId:string;
     question:string;
     type:QuestionType;
     difficultyLevel:QuestionDifficultyLevel;
}

export enum QuestionType {
     MCQ = "MCQ",
     LONG = "LONG",
     SHORT = "SHORT"
} 
export enum QuestionDifficultyLevel {
     EASY = "EASY",
     MEDIUM = "MEDIUM",
     HARD = "HARD"
}

