export interface Question {
     subTopicId:string;
     question:string;
     marks:number;
     type:QuestionType;
     difficultyLevel:QuestionDifficultyLevel;
     importId:string;
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

