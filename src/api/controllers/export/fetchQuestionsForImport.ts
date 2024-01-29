import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { ExportPaperRequest } from "./types";
import _ from "lodash";
import { prisma } from "@/shared/prisma";
import { AuthenticatedRequest } from "@/middlewares/types";
import { QuestionType } from "@prisma/client";



export const FetchQuestionsForExportHandler = async (req: AuthenticatedRequest, res: Response) => {
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
        let shortQuestion;
        let longQuestion;
        const usedQuestions = [] as string[];
        if (MCQVisible) {
            mcqQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: QuestionType.MCQ,
                    difficultyLevel: mcqDifficultyLevel,
                    id: {
                        notIn: usedQuestions
                    }
                },
                include: {
                    answers: true
                },
                orderBy: {
                    createdAt: 'asc'
                },
                take: parseInt(mcqQuestionQuantity.toString()),
            });
        }
        if (shortQuestionVisible) {
            shortQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: {
                        in:[QuestionType.FILLINTHEBLANK,QuestionType.MULTIPLSHORT, QuestionType.FILLINTHEBLANK,QuestionType.SHORT]
                    },
                    difficultyLevel: shortQuestionDifficultyLevel,
                    id: {
                        notIn: usedQuestions
                    }
                },
                include: {
                    answers: true
                },
                take: parseInt(shortQuestionQuantity?.toString()),
            });
        }
        if (longQuestionVisible) {
            longQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: QuestionType.LONG,
                    difficultyLevel: longQuestionDifficultyLevel,
                    id: {
                        notIn: usedQuestions
                    }
                },
                include: {
                    answers: true
                },
                take: parseInt(longQuestionQuantity?.toString()),
            });
        }
        return ApiResponse(true, "You can choose question for paper now", { mcqQuestion, shortQuestion, longQuestion }, 200, res);
    }
    catch (error) {
        console.log(error?.message);
        console.log("ExportPaperHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}

// const reservedQuestions = (questionId:string[], userId:string) =>{
//    try {
//      const reservedQuestion  = prisma.reserved.create({
//         data:{

//         }
//      });
//    } catch (error) {
//         console.log(error?.message);
//         console.log("ExportPaperHandler::error", JSON?.stringify(error));
//         return ApiResponse(false, "Something Went Wrong", error, 500, res);
//     }
// }