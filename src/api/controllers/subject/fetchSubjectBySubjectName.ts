import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubjectBySubjectNameHandler = async (req: Request, res: Response) => {
    try {
        const name = req.params?.name as string;
        const subject = await prisma.subject.findFirst({
            where: {
                subject: name,
            },
            include: {
                grade: true,
                topics: true
            }
        });

        if (!subject) {
            return ApiResponse(false, "Subject Not Found", null, 404, res);
        }
        return ApiResponse(true, "Subject Fetched Successfully", subject, 200, res);
    }
    catch (error) {
        console.log("FetchSubjectBySubjectNameHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}