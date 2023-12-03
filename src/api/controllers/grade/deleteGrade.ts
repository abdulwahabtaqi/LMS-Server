import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteGradeHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const grade = await prisma.grade.findFirst({
            where: { id }
        });
        if (_.isEmpty(grade)) {
            return ApiResponse(false, "Grade not found", null, 404, res);
        }
        const deletedGrade = await prisma.grade.delete({
            where: { id}
        });
        if (_.isEmpty(deletedGrade)) {
            return ApiResponse(false, "Grade not deleted", null, 409, res);
        }
        return ApiResponse(true, "Grade deleted", deletedGrade, 200, res);
    }
    catch (error) {
        console.log("DeleteGradeHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}