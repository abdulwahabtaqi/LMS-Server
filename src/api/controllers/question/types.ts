export interface Question {
     subTopicId:string;
     question:string;
     marks:number;
     type:QuestionType;
     difficultyLevel:QuestionDifficultyLevel;
     answerCount:number;
     importId:string;
}

export enum QuestionType {
     MCQ = "MCQ",
     LONG = "LONG",
     MULTIPLSHORT = "MULTIPLSHORT",
     MULTIPLLONG = "MULTIPLLONG",
     SHORT = "SHORT"
} 
export enum QuestionDifficultyLevel {
     EASY = "EASY",
     MEDIUM = "MEDIUM",
     HARD = "HARD"
}

