import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchTopicByTopicNameHandler = async (req: Request, res: Response) => {
    try {
       const name = req.params?.name as string;
        const topic = await prisma.topic.findFirst({
            where:{
               topic:name
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
        console.log("FetchTopicByTopicNameHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}