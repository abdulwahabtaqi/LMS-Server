import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteQuestionHandler = async (req: Request, res: Response) => {
    try {
        const id  = req?.params?.id as string;
        const question = await prisma.question.findUnique({
            where: {
                id: id
            }
        });
        if (!question) {
            return ApiResponse(false, "Question Not Found", null, 404, res);
        }
        const deletedQuestion = await prisma.question.delete({
            where: {
                id: id
            }
        });
        return ApiResponse(true, "Question Deleted Successfully", deletedQuestion, 200, res);   
    }
    catch (error) {
        console.log("DeleteTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}