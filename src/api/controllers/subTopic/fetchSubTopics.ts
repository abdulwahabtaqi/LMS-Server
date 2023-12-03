import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubTopicsHandler = async (req: Request, res: Response) => {
    try {
        const subTopics = await prisma.subTopic.findMany({
            include: {
                topic: true,
                questions: true
            }
        });
        return ApiResponse(true, "SubTopics Fetched Successfully", subTopics, 200, res);
    }
    catch (error) {
        console.log("FetchSubTopicsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}