import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { ExportPaperRequest, QuestionType } from "./types";
import _ from "lodash";
import { prisma } from "@/shared/prisma";



export const ExportPaperHandler = async (req: Request, res: Response) => {
    try {
        const {
            MCQVisible, longQuestionVisible, shortQuestionVisible, subTopicId,
            longQuestionDifficultyLevel,
            longQuestionQuantity, mcqDifficultyLevel, mcqQuestionQuantity,
            shortQuestionDifficultyLevel, shortQuestionQuantity
        } = req?.body as ExportPaperRequest;
        if (!(MCQVisible) && !(longQuestionVisible) && !(shortQuestionVisible)) {
            return ApiResponse(false, "At least one question must be selected", null, 400, res);
        }
        let mcqQuestion;
        let longQuestion;
        let shortQuestion;
        if (MCQVisible) {
            mcqQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: QuestionType.MCQ,
                    difficultyLevel: mcqDifficultyLevel
                },
                include: {
                    answers: true
                },
                take: mcqQuestionQuantity,
            });
        }
        if(shortQuestionVisible){
            shortQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: QuestionType.SHORT,
                    difficultyLevel: shortQuestionDifficultyLevel
                },
                include: {
                    answers: true
                },
                take: shortQuestionQuantity,
            });
        }
        if(longQuestionVisible){
            longQuestion = await prisma.question.findMany({
               where: {
                   subTopicId: subTopicId,
                   type: QuestionType.LONG,
                   difficultyLevel: longQuestionDifficultyLevel
               },
               include: {
                   answers: true
               },
               take: longQuestionQuantity,
           });
       }
    }
    catch (error) {
        console.log("ExportPaperHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}