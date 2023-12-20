export interface Answer {
     questionId:string;
     answer:string;
     type:AnswerType;
     isCorrect:boolean;
     difficultyLevel:QuestionDifficultyLevel;
}

export enum AnswerType {
     MCQ = "MCQ",
     LONG = "LONG",
     SHORT = "SHORT"
} 
export enum QuestionDifficultyLevel {
     EASY = "EASY",
     MEDIUM = "MEDIUM",
     HARD = "HARD"
}

