import _ from "lodash";
import { CsvFileInput } from "../types";

export const shortQuestionTransformer = (data: any): CsvFileInput[] => {
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 1010) {
            tempArray?.push(x);
        }
    });
    const mcqQuestions = [] as CsvFileInput[];
    tempArray?.forEach((x: any) => {
        mcqQuestions?.push({
            Type: "SHORT",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question:  x?.__EMPTY_3,
            Answer: x?.__EMPTY_4,
            AnswerImage:"",
            IsCorrect: "TRUE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage:  "",
            Marks: x?.__EMPTY_5 ?? 1,
            Counter: "",
            Additional: "",
        });
    });
    return mcqQuestions;
}