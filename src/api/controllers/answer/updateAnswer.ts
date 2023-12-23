import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Answer } from "./types";




export const UpdateAnswerHandler = async (req: Request, res: Response) => {
    try {
        const { answer, isCorrect, questionId } = req?.body as Answer;
        const id = req?.params?.id as string;
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
        const updatedAnswer = await prisma.answer.update({
            where:{
                id:id
            },
            data:{
                isCorrect:isCorrect==="false"?false:true,
                type: question?.type,
                questionId,
                answer:answer?.toLowerCase() as string,
            }
        });
        return ApiResponse(true, "Answer Updated Successfully", updatedAnswer, 200, res);
       
    }
    catch (error) {
        console.log("UpdateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}