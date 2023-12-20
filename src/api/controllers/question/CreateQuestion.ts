import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Question } from "./types";


export const CreateQuestionHandler = async (req: Request, res: Response) => {
    try {
        const { difficultyLevel, question, subTopicId, type } = req?.body as Question;
        const subTopic = await prisma.subTopic.findUnique({
            where: {
                id: subTopicId
            }
        });
        if (!subTopic) {
            return ApiResponse(false, "Sub Topic Not Found", null, 404, res);
        }
        const subTopicExists = await prisma.question.findFirst({
            where: {
                question: question?.toLowerCase() as string,
                subTopicId: subTopicId
            }
        });
        if (subTopicExists) {
            return ApiResponse(false, "Question Already Exists", null, 409, res);
        }
        const newQuestion = await prisma.question.create({
            data: {
                difficultyLevel,
                question:question?.toLowerCase() as string,
                subTopicId,
                type
            }
        });
        return ApiResponse(true, "Question Created Successfully", newQuestion, 201, res);
    }
    catch (error) {
        console.log("CreateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}