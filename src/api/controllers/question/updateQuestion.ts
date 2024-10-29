import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import { Question } from "./types";

export const UpdateQuestionHandler = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { difficultyLevel, question, subTopicId, type, marks, answer } = req.body as Question;

        const questionExists = await prisma.question.findUnique({
            where: { id },
            include: { answers: true },
        });

        if (!questionExists) {
            return ApiResponse(false, "Question Not Found", null, 404, res);
        }

        console.log("Existing Question:", questionExists);

        const updateData: any = {
            difficultyLevel,
            question,
            subTopicId,
            type,
            marks: parseInt(marks?.toString(), 10),
        };

        if (type === 'LONG' && answer) {

            if (questionExists.answers.length > 0) {
                updateData.answers = {
                    update: {
                        where: { id: questionExists.answers[0].id },
                        data: {
                            answer,

                        },
                    },
                };
            } else {
                updateData.answers = {
                    create: {
                        answer,
                        type: 'LONG',
                        isCorrect: false,
                    },
                };
            }
        }

        const updatedQuestion = await prisma.question.update({
            where: { id },
            data: {
                ...updateData,
                answers: updateData.answers,
            },
            include: { answers: true },
        });


        return ApiResponse(true, "Question Updated Successfully", updatedQuestion, 200, res);
    } catch (error) {
        console.error("UpdateQuestionHandler::error", JSON.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
};


// import { ApiResponse } from "@/shared";
// import { Request, Response } from "express";
// import { prisma } from "@/shared/prisma";
// import _ from "lodash";
// import { Question } from "./types";




// export const UpdateQuestionHandler = async (req: Request, res: Response) => {
//     try {
//         const id = req?.params?.id as string;
//         const {difficultyLevel, question, subTopicId ,type, marks} = req?.body as Question;
//         const questionExists = await prisma.question.findUnique({
//             where:{
//                 id:id
//             }
//         });
//         if(!questionExists){
//             return ApiResponse(false, "Question Not Found", null, 404, res);
//         }
//         const updatedQuestion = await prisma.question.update({
//             where:{
//                 id:id
//             },
//             data:{
//                 difficultyLevel,
//                 question,
//                 subTopicId,
//                 type,
//                 marks:parseInt(marks?.toString())
//             }
//         });
//         return ApiResponse(true, "Question Updated Successfully", updatedQuestion, 200, res);
//     }
//     catch (error) {
//         console.log("UpdateTopicHandler::error", JSON?.stringify(error));
//         return ApiResponse(false, "Something Went Wrong", error, 500, res);
//     }
// }