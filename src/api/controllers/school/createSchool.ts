import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { School } from "./types";




export const CreateSchoolHandler = async (req: Request, res: Response) => {
    try {
        const { type } = req.body as School;
        const school = await prisma.school.findFirst({
            where: {type:type?.toLowerCase() }
        });
        if (!_.isEmpty(school) ) {
            return ApiResponse(false, "School type already exists", null, 409, res);
        }
        const newSchool = await prisma.school.create({
            data: {
                type:type?.toLowerCase()
            }
        });
        if(_.isEmpty(newSchool)){
            return ApiResponse(false, "School type not created", null, 409, res);
        }
        return ApiResponse(true, "School type created", newSchool, 200, res);
    }
    catch (error) {
        console.log("CreateSchoolHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}