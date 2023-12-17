import { DifficultyLevel, QuestionType } from "@prisma/client";

export interface Question {
     subTopicId:string;
     question:string;
     type:QuestionType;
     difficultyLevel:DifficultyLevel;
}
