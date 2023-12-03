import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchSubTopicByIdHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params?.id as string;
        const subTopic = await prisma.subTopic.findUnique({
            where: {
                id: id
            },
            include: {
                topic: true,
                questions: true
            }
        });
        if (!subTopic) {
            return ApiResponse(false, "SubTopic Not Found", null, 404, res);
        }
        return ApiResponse(true, "SubTopic Fetched Successfully", subTopic, 200, res);
    }
    catch (error) {
        console.log("FetchSubTopicByIdHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}