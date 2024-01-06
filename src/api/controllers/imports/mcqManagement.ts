import { prisma } from "@/shared/prisma";
import { CreateMCQsInput, CreateMCQsResponse, CreateShortQuestionsInput } from "./types";


export const createMCQsQuestion = async (data:CreateMCQsInput)=>{
    try {
      const { MCQsAnswers, MCQsQuestions } = data;
      const newQuestions = await prisma.question.createMany({
            data: MCQsQuestions
        });
        if(newQuestions?.count > 0){
          const importId = data?.MCQsAnswers?.map(answer => answer?.importId) as string[];
          const questions = await prisma.question.findMany({
            where:{
              importId:{
                in:importId
              }
            },
            select:{
              id:true,
              importId:true
            }
          });
          const importIdsFromDB = questions?.map(question => question?.importId) as string[];
          data?.MCQsAnswers?.forEach(answer => {
            for(let i=0; i<importIdsFromDB?.length; i++){
              if(answer?.importId === importIdsFromDB[i]){
                answer.questionId = questions[i]?.id;
              }
            }
          });
          const newAnswers = await prisma.answer.createMany({
                data: MCQsAnswers?.map(answer => ({
                  ...answer,
                  isCorrect: answer?.isCorrect === 'true' ? true : false
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

export const createShortQuestion = async (data:CreateShortQuestionsInput)=>{
  try {
    const { ShortAnswers, ShortQuestions } = data;
    const newQuestions = await prisma.question.createMany({
          data: ShortQuestions
      });
      if(newQuestions?.count > 0){
        const importId = data?.ShortAnswers?.map(answer => answer?.importId) as string[];
        const questions = await prisma.question.findMany({
          where:{
            importId:{
              in:importId
            }
          },
          select:{
            id:true,
            importId:true
          }
        });
        const importIdsFromDB = questions?.map(question => question?.importId) as string[];
        data?.ShortAnswers?.forEach(answer => {
          for(let i=0; i<importIdsFromDB?.length; i++){
            if(answer?.importId === importIdsFromDB[i]){
              answer.questionId = questions[i]?.id;
            }
          }
        });
        const newAnswers = await prisma.answer.createMany({
              data: ShortAnswers?.map(answer => ({
                ...answer,
                isCorrect: answer?.isCorrect === 'true' ? true : false
              }))
          });
          if(newAnswers?.count > 0){
            return {status:true, message:"Short Questions Created Successfully"} as CreateMCQsResponse;
          }
      }
      return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
  } catch (error) {
     return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
  }
}

export const createLongQuestion = async (data:CreateShortQuestionsInput)=>{
  try {
    const { ShortAnswers, ShortQuestions } = data;
    const newQuestions = await prisma.question.createMany({
          data: ShortQuestions
      });
      if(newQuestions?.count > 0){
        const importId = data?.ShortAnswers?.map(answer => answer?.importId) as string[];
        const questions = await prisma.question.findMany({
          where:{
            importId:{
              in:importId
            }
          },
          select:{
            id:true,
            importId:true
          }
        });
        const importIdsFromDB = questions?.map(question => question?.importId) as string[];
        data?.ShortAnswers?.forEach(answer => {
          for(let i=0; i<importIdsFromDB?.length; i++){
            if(answer?.importId === importIdsFromDB[i]){
              answer.questionId = questions[i]?.id;
            }
          }
        });
        const newAnswers = await prisma.answer.createMany({
              data: ShortAnswers?.map(answer => ({
                ...answer,
                isCorrect: answer?.isCorrect === 'true' ? true : false
              }))
          });
          if(newAnswers?.count > 0){
            return {status:true, message:"Long Questions Created Successfully"} as CreateMCQsResponse;
          }
      }
      return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
  } catch (error) {
     return {status:false, message:"Something Went Wrong"} as CreateMCQsResponse;
  }
}