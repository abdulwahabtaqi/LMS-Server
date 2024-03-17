import { CsvFileInput } from "../types";

export const multipleChoiceQuestionTransformer = (data: any): CsvFileInput[] => {
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 666) {
            tempArray?.push(x);
        }
    });
    const mcqQuestions = [] as CsvFileInput[];
    tempArray?.forEach((x: any) => {
        console.log(convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase()))
        // a
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_4,
            AnswerImage: x?.__EMPTY_5 == "no" ? "" : x?.__EMPTY_5,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("a") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
        // b
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_6,
            AnswerImage: x?.__EMPTY_7 == "no" ? "" : x?.__EMPTY_7,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("b") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
        // c
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_8,
            AnswerImage: x?.__EMPTY_9 == "no" ? "" : x?.__EMPTY_9,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("c") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
        // d
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_10,
            AnswerImage: x?.__EMPTY_11 == "no" ? "" : x?.__EMPTY_11,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("d") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
        // e
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_12,
            AnswerImage: x?.__EMPTY_13 == "no" ? "" : x?.__EMPTY_13,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("e") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
        // f
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_14,
            AnswerImage: x?.__EMPTY_15 == "no" ? "" : x?.__EMPTY_15,
            IsCorrect: convertAnswersToArray(x?.__EMPTY_16?.toString()?.toLowerCase())?.includes("f") ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: "",
            Additional: "",
        });
    });
    return mcqQuestions;
}


const convertAnswersToArray = (str: string): string[] => {
    const arr = str?.split(/[,\s]+/);
    const uniqueArr = arr?.filter((item, index, self) => item?.trim() !== '' && self?.indexOf(item) === index);
    return uniqueArr;
}
