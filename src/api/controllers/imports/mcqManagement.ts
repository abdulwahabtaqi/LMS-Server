import { prisma } from "@/shared/prisma";
import { CreateLongQuestionsInput, CreateMCQsInput, CreateQuestionsResponse, CreateShortQuestionsInput } from "./types";
import { Question } from "../question/types";
import { Answer } from "../answer/types";
import _ from "lodash";


export const createMCQsQuestion = async (data: CreateMCQsInput) => {
  try {
    const { MCQsAnswers, MCQsQuestions } = data;
    const newQuestions = await prisma.question.createMany({
      data: MCQsQuestions
    });
    if (newQuestions?.count > 0) {
      const importId = data?.MCQsAnswers?.map(answer => answer?.importId) as string[];
      const questions = await prisma.question.findMany({
        where: {
          importId: {
            in: importId
          }
        },
        select: {
          id: true,
          importId: true
        }
      });
      const importIdsFromDB = questions?.map(question => question?.importId) as string[];
      data?.MCQsAnswers?.forEach(answer => {
        for (let i = 0; i < importIdsFromDB?.length; i++) {
          if (answer?.importId === importIdsFromDB[i]) {
            answer.questionId = questions[i]?.id;
          }
        }
      });
      const newAnswers = await prisma.answer.createMany({
        data: MCQsAnswers?.map(answer => ({
          ...answer,
          isCorrect: answer?.isCorrect === 'TRUE' ? true : false
        }))
      });
      if (newAnswers?.count > 0) {
        const failedQuestions = [] as Question[];
        const failedAnswers = [] as Answer[];
        await MCQsFailedHistory(failedQuestions, failedAnswers, importIdsFromDB, data);
        return { status: true, message: "MCQs Created Successfully", failed: { answer: failedAnswers, question: failedQuestions } } as CreateQuestionsResponse;
      }
    }
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  } catch (error) {
    console.log("createMCQsQuestion::error::message", JSON?.stringify(error?.message));
    // console.log("createMCQsQuestion::error", JSON?.stringify(error));
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  }
}
const MCQsFailedHistory = async (failedQuestions: Question[], failedAnswers: Answer[], questions: string[], data: CreateMCQsInput) => {
  for (let i = 0; i < data?.MCQsQuestions?.length; i++) {
    const question = questions?.find(question => question === data?.MCQsQuestions[i]?.importId);
    if (!_?.isEmpty(question)) {
      failedQuestions.push(data?.MCQsQuestions[i]);
    }
  }
  const importId = data?.MCQsAnswers?.map(answer => answer?.importId) as string[]
  const answers = await prisma.answer.findMany({
    where: {
      importId: {
        in: importId
      }
    },
    select: {
      id: true,
      importId: true
    }
  });
  for (let i = 0; i < data?.MCQsAnswers?.length; i++) {
    const answer = answers?.find(answer => answer?.importId === data?.MCQsAnswers[i]?.importId);
    if (!_?.isEmpty(answer)) {
      failedAnswers.push(data?.MCQsAnswers[i]);
    }
  }
}


export const createShortQuestion = async (data: CreateShortQuestionsInput) => {
  try {
    const { ShortAnswers, ShortQuestions } = data;
    const newQuestions = await prisma.question.createMany({
      data: ShortQuestions
    });
    if (newQuestions?.count > 0) {
      const importId = data?.ShortAnswers?.map(answer => answer?.importId) as string[];
      const questions = await prisma.question.findMany({
        where: {
          importId: {
            in: importId
          }
        },
        select: {
          id: true,
          importId: true
        }
      });
      const importIdsFromDB = questions?.map(question => question?.importId) as string[];
      data?.ShortAnswers?.forEach(answer => {
        for (let i = 0; i < importIdsFromDB?.length; i++) {
          if (answer?.importId === importIdsFromDB[i]) {
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
      if (newAnswers?.count > 0) {
        const failedQuestions = [] as Question[];
        const failedAnswers = [] as Answer[];
        await ShortQuestionsFailedHistory(failedQuestions, failedAnswers, importIdsFromDB, data);
        return { status: true, message: "Short Questions Created Successfully", failed:{question:failedQuestions, answer:failedAnswers} } as CreateQuestionsResponse;
      }
    }
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  } catch (error) {
    console.log("createMCQsQuestion::error::message", JSON?.stringify(error?.message));
    console.log("createShortQuestion::error", JSON?.stringify(error));
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  }
}
const ShortQuestionsFailedHistory = async (failedQuestions: Question[], failedAnswers: Answer[], questions: string[], data: CreateShortQuestionsInput) => {
  for (let i = 0; i < data?.ShortQuestions?.length; i++) {
    const question = questions?.find(question => question === data?.ShortQuestions[i]?.importId);
    if (!_?.isEmpty(question)) {
      failedQuestions.push(data?.ShortQuestions[i]);
    }
  }
  const importId = data?.ShortAnswers?.map(answer => answer?.importId) as string[]
  const answers = await prisma.answer.findMany({
    where: {
      importId: {
        in: importId
      }
    },
    select: {
      id: true,
      importId: true
    }
  });
  for (let i = 0; i < data?.ShortAnswers?.length; i++) {
    const answer = answers?.find(answer => answer?.importId === data?.ShortAnswers[i]?.importId);
    if (!_?.isEmpty(answer)) {
      failedAnswers.push(data?.ShortAnswers[i]);
    }
  }
}


export const createLongQuestion = async (data: CreateLongQuestionsInput) => {
  try {
    const { LongAnswers, LongQuestions } = data;
    const newQuestions = await prisma.question.createMany({
      data: LongQuestions
    });
    if (newQuestions?.count > 0) {
      const importId = data?.LongAnswers?.map(answer => answer?.importId) as string[];
      const questions = await prisma.question.findMany({
        where: {
          importId: {
            in: importId
          }
        },
        select: {
          id: true,
          importId: true
        }
      });
      const importIdsFromDB = questions?.map(question => question?.importId) as string[];
      data?.LongAnswers?.forEach(answer => {
        for (let i = 0; i < importIdsFromDB?.length; i++) {
          if (answer?.importId === importIdsFromDB[i]) {
            answer.questionId = questions[i]?.id;
          }
        }
      });
      const newAnswers = await prisma.answer.createMany({
        data: LongAnswers?.map(answer => ({
          ...answer,
          isCorrect: answer?.isCorrect === 'true' ? true : false
        }))
      });
      if (newAnswers?.count > 0) {
        const failedQuestions = [] as Question[];
        const failedAnswers = [] as Answer[];
        await LongQuestionsFailedHistory(failedQuestions, failedAnswers, importIdsFromDB, data);
        return { status: true, message: "Long Questions Created Successfully", failed:{question:failedQuestions, answer:failedAnswers} } as CreateQuestionsResponse;
      }
    }
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  } catch (error) {
    console.log("createMCQsQuestion::error::message", JSON?.stringify(error?.message));
    console.log("createLongQuestion::error", JSON?.stringify(error));
    return { status: false, message: "Something Went Wrong" } as CreateQuestionsResponse;
  }
}
const LongQuestionsFailedHistory = async (failedQuestions: Question[], failedAnswers: Answer[], questions: string[], data: CreateLongQuestionsInput) => {
  for (let i = 0; i < data?.LongQuestions?.length; i++) {
    const question = questions?.find(question => question === data?.LongQuestions[i]?.importId);
    if (!_?.isEmpty(question)) {
      failedQuestions.push(data?.LongQuestions[i]);
    }
  }
  const importId = data?.LongAnswers?.map(answer => answer?.importId) as string[]
  const answers = await prisma.answer.findMany({
    where: {
      importId: {
        in: importId
      }
    },
    select: {
      id: true,
      importId: true
    }
  });
  for (let i = 0; i < data?.LongAnswers?.length; i++) {
    const answer = answers?.find(answer => answer?.importId === data?.LongAnswers[i]?.importId);
    if (!_?.isEmpty(answer)) {
      failedAnswers.push(data?.LongAnswers[i]);
    }
  }
}