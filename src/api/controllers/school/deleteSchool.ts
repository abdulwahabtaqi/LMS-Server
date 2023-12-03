import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteSchoolHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const school = await prisma.school.findFirst({
            where: {id }
        });
        if (_.isEmpty(school) ) {
            return ApiResponse(false, "School type not found", null, 404, res);
        }
        const deletedSchool = await prisma.school.delete({
            where: { id }
        });
        if(_.isEmpty(deletedSchool)){
            return ApiResponse(false, "School type not deleted", null, 409, res);
        }
        return ApiResponse(true, "School type deleted", deletedSchool, 200, res);
    }
    catch (error) {
        console.log("DeleteSchoolHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}