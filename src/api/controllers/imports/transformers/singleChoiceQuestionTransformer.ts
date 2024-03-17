import { CsvFileInput } from "../types";

export const singleChoiceQuestionTransformer = (data:any) : CsvFileInput[]=>{
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 555) {
            tempArray?.push(x);
        }
    });
    const mcqQuestions = [] as CsvFileInput[];
    tempArray?.forEach((x: any) => {

        // a
        mcqQuestions?.push({
            Type: "MCQ",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_4,
            AnswerImage: x?.__EMPTY_5 == "no" ? "" : x?.__EMPTY_5,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
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