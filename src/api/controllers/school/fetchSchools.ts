import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSchoolsHandler = async (req: Request, res: Response) => {
    try {
        const schools = await prisma.school.findMany({
            include:{
                grades:true
            }
        });
        return ApiResponse(true, "School types", schools, 200, res);
    }
    catch (error) {
        console.log("FetchSchoolsHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}