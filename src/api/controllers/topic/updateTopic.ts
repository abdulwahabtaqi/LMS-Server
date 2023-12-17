import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Topic } from "./types";




export const UpdateTopicHandler = async (req: Request, res: Response) => {
    try {
        const id  = req.params?.id as string;
        const {topic, subjectId} = req.body as Topic;
        const topicExists = await prisma.topic.findUnique({
            where:{
                id:id
            }
        });
        if(!topicExists){
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        const updatedTopic = await prisma.topic.update({
            where:{
                id:id
            },
            data:{
                topic:topic,
                subjectId:subjectId,
            }
        });
        return ApiResponse(true, "Topic Updated Successfully", updatedTopic, 200, res);
    }
    catch (error) {
        console.log("UpdateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}