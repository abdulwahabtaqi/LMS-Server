import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchTopicsHandler = async (req: Request, res: Response) => {
    try {
        const topics = await prisma.topic.findMany({
            include: {
                subject: true,
                subTopics: true
            }
        });
        return ApiResponse(true, "Topics Fetched Successfully", topics, 200, res);
    }
    catch (error) {
        console.log("FetchTopicsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}