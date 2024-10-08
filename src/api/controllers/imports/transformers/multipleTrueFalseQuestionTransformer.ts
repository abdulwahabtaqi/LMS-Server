import _ from "lodash";
import { CsvFileInput } from "../types";

export const multipleTrueFalseQuestionTransformer = (data: any): any[] => {
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 999) {
            tempArray?.push(x);
        }
    });
    const mcqQuestions = [] as any[];
    tempArray?.forEach((x: any) => {

        mcqQuestions?.push({
            Type: "MULTIPLETRUEFALSE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: !_?.isUndefined(x?.__EMPTY_8) ? x?.__EMPTY_8 : "Tick the correct box",
            Answer: x?.__EMPTY_3,
            AnswerImage: "",
            IsCorrect: x?.__EMPTY_6 === true ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: x?.__EMPTY_6 || "",
            Marks: x?.__EMPTY_7 ?? 1,
            Counter: "",
            Additional: "",
        });
    });
    return mcqQuestions;
}