import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";
import { Question } from "./types";




export const UpdateQuestionHandler = async (req: Request, res: Response) => {
    try {
        const id = req?.params?.id as string;
        const {difficultyLevel, question, subTopicId ,type, marks} = req?.body as Question;
        const questionExists = await prisma.question.findUnique({
            where:{
                id:id
            }
        });
        if(!questionExists){
            return ApiResponse(false, "Question Not Found", null, 404, res);
        }
        const updatedQuestion = await prisma.question.update({
            where:{
                id:id
            },
            data:{
                difficultyLevel,
                question,
                subTopicId,
                type,
                marks:parseInt(marks?.toString())
            }
        });
        return ApiResponse(true, "Question Updated Successfully", updatedQuestion, 200, res);
    }
    catch (error) {
        console.log("UpdateTopicHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}