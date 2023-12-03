import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { School } from "./types";




export const UpdateSchoolHandler = async (req: Request, res: Response) => {
    try {
        const { type } = req.body as School;
        const id = req.params?.id as string;
        const school = await prisma.school.findFirst({
            where: {id}
        });
        if (_.isEmpty(school) ) {
            return ApiResponse(false, "School type not found", null, 404, res);
        }
        const updatedSchool = await prisma.school.update({
            where: { id },
            data: {
                type
            }
        });
        if(_.isEmpty(updatedSchool)){
            return ApiResponse(false, "School type not updated", null, 409, res);
        }
        return ApiResponse(true, "School type updated", updatedSchool, 200, res);
    }
    catch (error) {
        console.log("UpdateSchoolHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}