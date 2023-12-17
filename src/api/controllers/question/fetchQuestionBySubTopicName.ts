import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const FetchQuestionBySubTopicName = async (req: Request, res: Response) => {
    try {
        const name = req?.params?.name as string;
        const subTopic = await prisma.subTopic.findFirst({
            where: {
                subTopic: name
            }
        });
        if (!subTopic) {
            return ApiResponse(false, "Sub Topic Not Found", null, 404, res);
        }
        const questions = await prisma.question.findMany({
            where: {
                subTopicId: subTopic?.id
            },
            include: {
                answers: true
            }
        });
        return ApiResponse(true, "Questions Fetched Successfully", questions, 200, res);
    }
    catch (error) {
        console.log("FetchTopicBySubjectNameHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}