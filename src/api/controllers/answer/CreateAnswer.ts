import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Answer } from "./types";


export const CreateAnswerHandler = async (req: Request, res: Response) => {
    try {
        const { answer, isCorrect, questionId } = req?.body as Answer;
        const question = await prisma.question.findUnique({
            where: {
                id: questionId
            }
        });
        if (!question) {
            return ApiResponse(false, "Question Not Found", null, 404, res);
        }
        const answerExists = await prisma.answer.findFirst({
            where: {
                answer: answer?.toLowerCase() as string,
                questionId: questionId
            }
        });
        if (answerExists) {
            return ApiResponse(false, "Answer Already Exists", null, 409, res);
        }
        const newAnswer = await prisma.answer.create({
           data:{
            isCorrect:isCorrect==="false"?false:true,
            type: question?.type,
            questionId,
            answer:answer?.toLowerCase() as string,
            importId:question?.importId
           }
        });
        return ApiResponse(true, "Answer Created Successfully", newAnswer, 201, res);
    }
    catch (error) {
        console.log("CreateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}