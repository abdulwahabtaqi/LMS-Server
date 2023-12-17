import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Topic } from "./types";


export const CreateTopicHandler = async (req: Request, res: Response) => {
    try {
        const { topic, subjectId } = req.body as Topic;
        const subject = await prisma.subject.findUnique({
            where: {
                id: subjectId
            }
        });
        if (!subject) {
            return ApiResponse(false, "Subject Not Found", null, 404, res);
        }
        const topicExists = await prisma.topic.findFirst({
            where: {
                topic: topic,
                subjectId: subjectId
            }
        });
        if (topicExists) {
            return ApiResponse(false, "Topic Already Exists", null, 409, res);
        }
        const newTopic = await prisma.topic.create({
            data: {
                topic: topic,
                subjectId: subjectId
            }
        });
        return ApiResponse(true, "Topic Created Successfully", newTopic, 201, res);
    }
    catch (error) {
        console.log("CreateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}