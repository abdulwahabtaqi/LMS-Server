import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubjectsHandler = async (req: Request, res: Response) => {
    try {
        const subjects = await prisma.subject.findMany({
            include:{
                grade:true,
                topics:true
            }
        });
        if(!subjects){
            return ApiResponse(false, "Subjects Not Found", null, 404, res);
        }
        return ApiResponse(true, "Subjects Fetched Successfully", subjects, 200, res);
    }
    catch (error) {
        console.log("FetchSubjectsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}