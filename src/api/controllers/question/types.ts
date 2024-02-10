export interface Question {
     subTopicId:string;
     question:string;
     marks:number;
     type:QuestionType;
     difficultyLevel:QuestionDifficultyLevel;
     answerCount:number;
     importId:string;
     questionImage:string;
     mcqImage:boolean;
     additional:string;
}

export enum QuestionType {
     MCQ = "MCQ",
     LONG = "LONG",
     MULTIPLSHORT = "MULTIPLSHORT",
     MULTIPLLONG = "MULTIPLLONG",
     SHORT = "SHORT",
     FILLINTHEBLANK = "FILLINTHEBLANK"
} 
export enum QuestionDifficultyLevel {
     EASY = "EASY",
     MEDIUM = "MEDIUM",
     HARD = "HARD"
}

