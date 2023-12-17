import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { SubTopic } from "./types";


export const CreateSubTopicHandler = async (req: Request, res: Response) => {
    try {
        const { subTopic, topicId } = req.body as SubTopic;
        const topic = await prisma.topic.findUnique({
            where: {
                id: topicId
            }
        });
        if (!topic) {
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        const subTopicExists = await prisma.subTopic.findFirst({
            where: {
                subTopic: subTopic,
                topicId: topicId
            }
        });
        if (subTopicExists) {
            return ApiResponse(false, "SubTopic Already Exists", null, 409, res);
        }
        const newSubTopic = await prisma.subTopic.create({
            data: {
                subTopic: subTopic,
                topicId: topicId
            }
        });
        return ApiResponse(true, "SubTopic Created Successfully", newSubTopic, 201, res);

    }
    catch (error) {
        console.log("CreateSubTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}