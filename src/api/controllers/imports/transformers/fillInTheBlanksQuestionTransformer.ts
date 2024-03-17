import _ from "lodash";
import { CsvFileInput } from "../types";

export const fillInTheBlanksQuestionTransformer = (data: any): CsvFileInput[] => {
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 777) {
            tempArray?.push(x);
        }
    });
    const mcqQuestions = [] as CsvFileInput[];
    tempArray?.forEach((x: any) => {
        mcqQuestions?.push({
            Type: "FILLINTHEBLANK",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: !_?.isUndefined(x?.__EMPTY_5) ? x?.__EMPTY_5 : "Complete the following",
            Answer: createAnswer(x?.__EMPTY_3, x?.__EMPTY_4),
            AnswerImage:"",
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: (!_?.isUndefined(x?.__EMPTY_7) ? (x?.__EMPTY_7 == "no" ? x?.__EMPTY_7 : "") : ""),
            Marks: x?.__EMPTY_6 ?? 1,
            Counter: "",
            Additional: "",
        });
    });
    return mcqQuestions;
}

const createAnswer = (question: string, answer: string): string => {
    const ans = question?.replace(/\b\s*_{2,}\s*\b/g, " DASH22 ");
    return `${ans} --${answer}--`;
}