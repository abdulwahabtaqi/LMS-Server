import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Subject } from "./types";


export const CreateSubjectHandler = async (req: Request, res: Response) => {
    try {
        const { subject, gradeId } = req.body as Subject;
        const grade = await prisma.grade.findUnique({
            where: {
                id: gradeId
            }
        });
        if (!grade) {
            return ApiResponse(false, "Grade Not Found", null, 404, res);
        }
        const subjectExists = await prisma.subject.findFirst({
            where: {
                subject: subject,
                gradeId: gradeId
            }
        });
        if (subjectExists) {
            return ApiResponse(false, "Subject Already Exists", null, 409, res);
        }
        const newSubject = await prisma.subject.create({
            data: {
                subject: subject,
                gradeId: gradeId
            }
        });
        return ApiResponse(true, "Subject Created Successfully", newSubject, 201, res);
    }
    catch (error) {
        console.log("CreateSubjectHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}