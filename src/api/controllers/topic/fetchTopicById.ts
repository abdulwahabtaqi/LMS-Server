import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchTopicByIdHandler = async (req: Request, res: Response) => {
    try {
        const id  = req.params?.id as string;
        const topic = await prisma.topic.findUnique({
            where: {
                id: id
            },
            include:{
                subject:true,
                subTopics:true
            }
        });
        if (!topic) {
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        return ApiResponse(true, "Topic Fetched Successfully", topic, 200, res);
    }
    catch (error) {
        console.log("FetchTopicByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}