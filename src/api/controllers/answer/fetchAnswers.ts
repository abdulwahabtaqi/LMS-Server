import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchAnswersHandler = async (req: Request, res: Response) => {
    try {
        const answers = await prisma.answer.findMany({
            include:{
                question:true
            }
        });
        return ApiResponse(true, "Answers Fetched Successfully", answers, 200, res);
    }
    catch (error) {
        console.log("FetchTopicsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}