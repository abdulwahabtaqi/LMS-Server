import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchAnswerByNameHandler = async (req: Request, res: Response) => {
    try {
        const  answer  = req?.params?.answer as string;
        const answerExists = await prisma.answer.findFirst({
            where: {
                answer: answer?.toLowerCase() as string,
            }
        });
        if (!answerExists) {
            return ApiResponse(false, "Answer Not Found", null, 404, res);
        }
        return ApiResponse(true, "Answer Fetched Successfully", answerExists, 200, res);
    }
    catch (error) {
        console.log("FetchTopicByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}