import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubTopicByTopicName = async (req: Request, res: Response) => {
    try {
        const topic = req.params?.topic as string;
        const subTopic = await prisma.subTopic.findMany({
            where:{
                topic:{
                    topic:topic
                }
            },
            include:{
                questions:true,
                topic:true
            }
        });
        if(!subTopic){
            return ApiResponse(false, "SubTopic Not Found", null, 404, res);
        }
        return ApiResponse(true, "SubTopic Fetched Successfully", subTopic, 200, res);
    }
    catch (error) {
        console.log("FetchSubTopicByTopicName::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}