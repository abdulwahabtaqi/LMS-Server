import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteTopicHandler = async (req: Request, res: Response) => {
    try {
        const id  = req.params?.id as string;
        const topic = await prisma.topic.findUnique({
            where: {
                id: id
            }
        });
        if (!topic) {
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        const deletedTopic = await prisma.topic.delete({
            where: {
                id: id
            }
        });
        return ApiResponse(true, "Topic Deleted Successfully", deletedTopic, 200, res);
    }
    catch (error) {
        console.log("DeleteTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}