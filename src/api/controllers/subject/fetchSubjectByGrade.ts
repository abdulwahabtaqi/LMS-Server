import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubjectByGradeHandler = async (req: Request, res: Response) => {
    try {
        const grade = req?.params?.grade as string;
        const subject = await prisma.subject.findMany({
            where:{
                gradeId:grade
            },
            include:{
                grade:true,
                topics:true
            }
        });
        if(_?.isEmpty(subject)){
            return ApiResponse(false, "Subject Not Found", null, 404, res);
        }
        return ApiResponse(true, "Subject Fetched Successfully", subject, 200, res);
    }
    catch (error) {
        console.log("FetchSubjectByGradeHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}