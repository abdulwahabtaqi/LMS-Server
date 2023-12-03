import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubTopicBySubTopicName = async (req: Request, res: Response) => {
    try {
        const name = req.params?.name as string;
        const subTopic = await prisma.subTopic.findFirst({
           where:{
                subTopic:name
           },
            include:{
                topic:true,
                questions:true,
            }
        });
        if(!subTopic){
            return ApiResponse(false, "Sub Topic Not Found", null, 404, res);
        }
        return ApiResponse(true, "Sub Topic Fetched Successfully", subTopic, 200, res);
    }
    catch (error) {
        console.log("FetchSubTopicBySubTopicName::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}