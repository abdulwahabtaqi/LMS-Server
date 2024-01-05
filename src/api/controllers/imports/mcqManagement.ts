import { prisma } from "@/shared/prisma";
import { CreateMCQsInput, CreateMCQsResponse } from "./types";


export const createMCQsQuestion = async (data:CreateMCQsInput)=>{
    try {
      const { MCQsAnswers, MCQsQuestions } = data;
      const newQuestions = await prisma.question.createMany({
            data: MCQsQuestions
        });
        if(newQuestions?.count > 0){
          const newAnswers = await prisma.answer.createMany({
                data: MCQsAnswers?.map(answer => ({
                  ...answer,
                  isCorrect: answer.isCorrect === 'true' ? true : false
                }))
            });
            if(newAnswers?.count > 0){
              return {status:true, message:"MCQs Created Successfully"} as CreateMCQsResponse;
            }
        }
        return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
    } catch (error) {
       return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
    }
}