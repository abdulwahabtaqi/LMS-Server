import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { SubTopic } from "./types";




export const UpdateSubTopicHandler = async (req: Request, res: Response) => {
    try {
        const { subTopic, topicId } = req.body as SubTopic;
        const id = req.params?.id as string;
        const topic = await prisma.topic.findUnique({
            where: {
                id: topicId
            }
        });
        if (!topic) {
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        const updatedSubTopic = await prisma.subTopic.update({
            where: {
                id: id
            },
            data: {
                subTopic: subTopic,
                topicId: topicId,
            }
        });
        return ApiResponse(true, "SubTopic Updated Successfully", updatedSubTopic, 200, res);
    }
    catch (error) {
        console.log("UpdateSubTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}