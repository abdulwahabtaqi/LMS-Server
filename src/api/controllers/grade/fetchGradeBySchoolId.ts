import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";


export const FetchGradeBySchoolIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id as string;
        const grades = await prisma.grade.findMany({
            where: {
                schoolId: id
            },
            include: {
                school: true
            }
        });
        return ApiResponse(true, "Grades Fetched Successfully", grades, 200, res);
    }
    catch (error) {
        console.log("FetchGradeByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}