import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchTopicBySubjectNameHandler = async (req: Request, res: Response) => {
    try {
        const subject = req.params?.subject as string;
        const topic = await prisma.topic.findMany({
            where:{
                subject:{
                    subject:subject
                }
            },
            include:{
                subject:true,
                subTopics:true
            }
        });
        if(!topic){
            return ApiResponse(false, "Topic Not Found", null, 404, res);
        }
        return ApiResponse(true, "Topic Fetched Successfully", topic, 200, res);
    }
    catch (error) {
        console.log("FetchTopicBySubjectNameHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}