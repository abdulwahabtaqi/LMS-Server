import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteSubTopicHandler = async (req: Request, res: Response) => {
    try {
       const id = req.params?.id as string;
         const subTopic = await prisma.subTopic.findUnique({
              where:{
                id:id
              }
         });
            if(!subTopic){
                return ApiResponse(false, "Sub Topic Not Found", null, 404, res);
            }
            const deletedSubTopic = await prisma.subTopic.delete({
                where:{
                    id:id
                }
            });
            return ApiResponse(true, "Sub Topic Deleted Successfully", deletedSubTopic, 200, res);
    }
    catch (error) {
        console.log("DeleteSubTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}