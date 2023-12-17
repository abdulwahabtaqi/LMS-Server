import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchQuestionByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id as string;
        const question = await prisma.question.findUnique({
            where: {
                id: id
            },
            include: {
                subTopic: true,
                answers: true
            }
        });
        if (!question) {
            return ApiResponse(false, "Question Not Found", null, 404, res);
        }
        return ApiResponse(true, "Question Fetched Successfully", question, 200, res);
    }
    catch (error) {
        console.log("FetchTopicByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}