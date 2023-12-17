import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchQuestionsHandler = async (req: Request, res: Response) => {
    try {
        const questions = await prisma.question.findMany({
            include: {
                subTopic: true,
                answers: true
            }
        });
        return ApiResponse(true, "Questions Fetched Successfully", questions, 200, res);    
    }
    catch (error) {
        console.log("FetchTopicsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}