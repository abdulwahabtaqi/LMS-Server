import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubjectByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const subject = await prisma.subject.findUnique({
            where:{
                id:id
            },
            include:{
                topics:true, 
                grade:true  
            }
        });
        if(!subject){
            return ApiResponse(false, "Subject Not Found", null, 404, res);
        }
        return ApiResponse(true, "Subject Fetched Successfully", subject, 200, res);
    }
    catch (error) {
        console.log("FetchSubjectByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}