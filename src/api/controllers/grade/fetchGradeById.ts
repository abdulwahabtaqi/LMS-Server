import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchGradeByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const grade = await prisma.grade.findFirst({
            where: { id },
            include:{
                school:true,
                subjects:true
            }
        });
        if (_?.isEmpty(grade) ) {
            return ApiResponse(false, "Grade not found", null, 404, res);
        }
        return ApiResponse(true, "Grade found", grade, 200, res);
    }
    catch (error) {
        console.log("FetchGradeByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}