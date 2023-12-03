import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSchoolByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const school = await prisma.school.findFirst({
            where: {id },
            include:{
                grades:true
            }
        });
        if (_.isEmpty(school) ) {
            return ApiResponse(false, "School type not found", null, 404, res);
        }
        return ApiResponse(true, "School type found", school, 200, res);
    }
    catch (error) {
        console.log("FetchSchoolByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}