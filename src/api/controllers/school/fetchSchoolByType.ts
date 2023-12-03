import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSchoolByTypeHandler = async (req: Request, res: Response) => {
    try {
        const type = req.params?.type as string;
        const school = await prisma.school.findFirst({
            where: {type:type?.toLowerCase() },
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
        console.log("FetchSchoolByTypeHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}