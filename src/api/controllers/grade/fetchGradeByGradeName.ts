import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchGradeByGradeNameHandler = async (req: Request, res: Response) => {
    try {
        const gradeName = req.params?.name as string;
        const grade = await prisma.grade.findFirst({
            where: { grade:gradeName?.toLowerCase() },
            include:{
                school:true,
                subjects:true
            }
        });
        if (_.isEmpty(grade) ) {
            return ApiResponse(false, "Grade not found", null, 404, res);
        }
        return ApiResponse(true, "Grade found", grade, 200, res);
    }
    catch (error) {
        console.log("FetchGradeByGradeNameHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}