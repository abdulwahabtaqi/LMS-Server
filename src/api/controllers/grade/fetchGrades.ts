import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchGradesHandler = async (req: Request, res: Response) => {
    try {
        const grades = await prisma.grade.findMany({
            include:{
                school:true,
                subjects:true
            }
        });
        return ApiResponse(true, "Grades", grades, 200, res);
    }
    catch (error) {
        console.log("FetchGradesHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}