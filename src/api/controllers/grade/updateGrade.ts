import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const UpdateGradeHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, schoolId } = req.body;
        const grade = await prisma.grade.findFirst({
            where: { id }
        });
        if (_.isEmpty(grade)) {
            return ApiResponse(false, "Grade not found", null, 404, res);
        }
        const updatedGrade = await prisma.grade.update({
            where: { id },
            data: {
                grade:name?.toLowerCase(),
                schoolId
            }
        });
        if (_.isEmpty(updatedGrade)) {
            return ApiResponse(false, "Grade not updated", null, 409, res);
        }
        return ApiResponse(true, "Grade updated", updatedGrade, 200, res);
    }
    catch (error) {
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}