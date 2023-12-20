import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteAnswerHandler = async (req: Request, res: Response) => {
    try {
        const  id  = req?.params?.id as string;
        const answer = await prisma.answer.findUnique({
            where: {
                id: id
            }
        });
        if (!answer) {
            return ApiResponse(false, "Answer Not Found", null, 404, res);
        }
        await prisma.answer.delete({
            where: {
                id: id
            }
        });
        return ApiResponse(true, "Answer Deleted Successfully", null, 200, res);
    }
    catch (error) {
        console.log("DeleteTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}