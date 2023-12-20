import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchAnswerByIdHandler = async (req: Request, res: Response) => {
    try {
        const  id = req?.params?.id as string;
        const answer = await prisma.answer.findUnique({
            where: {
                id: id
            }
        });
        if (!answer) {
            return ApiResponse(false, "Answer Not Found", null, 404, res);
        }
        return ApiResponse(true, "Answer Fetched Successfully", answer, 200, res);
    }
    catch (error) {
        console.log("FetchTopicByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}