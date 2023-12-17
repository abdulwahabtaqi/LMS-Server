import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Subject } from "./types";




export const UpdateSubjectHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const { subject, gradeId } = req.body as Subject;
        const subjectExists = await prisma.subject.findUnique({
            where:{
                id:id
            }
        });
        if(!subjectExists){
            return ApiResponse(false, "Subject Not Found", null, 404, res);
        }
        const updatedSubject = await prisma.subject.update({
            where:{
                id:id
            },
            data:{
                subject:subject,
                gradeId:gradeId
            }
        });
        return ApiResponse(true, "Subject Updated Successfully", updatedSubject, 200, res);
    }
    catch (error) {
        console.log("UpdateSubjectHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}