import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Grade } from "./types";




export const CreateGradeHandler = async (req: Request, res: Response) => {
    try {
        const { grade, schoolId } = req.body as Grade;
        const school = await prisma.school.findFirst({
            where: { id: schoolId }
        });
        if (_.isEmpty(school)) {
            return ApiResponse(false, "School not found", null, 404, res);
        }
        const gradeExists = await prisma.grade.findFirst({
            where: { grade, schoolId }
        });
        if (!_.isEmpty(gradeExists)) {
            return ApiResponse(false, "Grade already exists against school type", null, 409, res);
        }
        const newGrade = await prisma.grade.create({
            data: {
                grade:grade?.toLowerCase(),
                schoolId
            }
        });
        if (_.isEmpty(newGrade)) {
            return ApiResponse(false, "Grade not created", null, 409, res);
        }
        return ApiResponse(true, "Grade created", newGrade, 200, res);
    }
    catch (error) {
        console.log("CreateGradeHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}