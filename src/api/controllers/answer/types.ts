export interface Answer {
     questionId:string;
     answer:string;
     type:AnswerType;
     isCorrect:string;
     difficultyLevel:QuestionDifficultyLevel;
     importId:string;
     sequenceNo:number;
     answerImage:string;
     additional:string;
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

