import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { ExportPaperRequest, QuestionType } from "./types";
import _ from "lodash";
import { prisma } from "@/shared/prisma";
import { AuthenticatedRequest } from "@/middlewares/types";



export const FetchQuestionsForExportHandler = async (req: AuthenticatedRequest, res: Response) => {
    try {
        const {
            MCQVisible, longQuestionVisible, shortQuestionVisible, subTopicId,
            longQuestionDifficultyLevel,
            longQuestionQuantity, mcqDifficultyLevel, mcqQuestionQuantity,
            shortQuestionDifficultyLevel, shortQuestionQuantity
        } = req?.body as ExportPaperRequest;
        const reservedQuestions = prisma.reserved.findMany({
            where: {
                userId: req?.user?.id
            }
        })
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
                take: mcqQuestionQuantity,
            });
        }
        if (shortQuestionVisible) {
            shortQuestion = await prisma.question.findMany({
                where: {
                    subTopicId: subTopicId,
                    type: QuestionType.SHORT,
                    difficultyLevel: shortQuestionDifficultyLevel,
                    id: {
                        notIn: usedQuestions
                    }
                },
                include: {
                    answers: true
                },
                take: shortQuestionQuantity,
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
                take: longQuestionQuantity,
            });
        }
        return ApiResponse(true, "Paper Exported Successfully", { mcqQuestion, shortQuestion, longQuestion }, 200, res);
    }
    catch (error) {
        console.log("ExportPaperHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}