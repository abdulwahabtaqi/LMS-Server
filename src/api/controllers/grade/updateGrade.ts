import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Grade } from "./types";




export const UpdateGradeHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { grade, schoolId } = req.body as Grade;
        const checkGrade = await prisma.grade.findFirst({
            where: { id }
        });
        if (_.isEmpty(checkGrade)) {
            return ApiResponse(false, "Grade not found", null, 404, res);
        }
        const updatedGrade = await prisma.grade.update({
            where: { id },
            data: {
                grade:grade?.toLowerCase(),
                schoolId
            }
        });
        if (_.isEmpty(updatedGrade)) {
            return ApiResponse(false, "Grade not updated", null, 409, res);
        }
        return ApiResponse(true, "Grade updated", updatedGrade, 200, res);
    }
    catch (error) {
        console.log("UpdateGradeHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}