import { CsvFileInput } from "../types";

export const sequenceQuestionTransformer = (data: any): CsvFileInput[] => {
    // console.log("data=====>", data);        
    const tempArray = [] as any;
    data?.forEach((x: any) => {
        const keys = Object?.values(x);
        if (keys?.[0] == 888) {
            tempArray?.push(x);
        }
    });

    const mcqQuestions = [] as CsvFileInput[];
    tempArray?.forEach((x: any) => {

        // a
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_4,
            AnswerImage: x?.__EMPTY_5 == "no" ? "" : x?.__EMPTY_5,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("a") + 1)?.toString(),
            Additional: "",  
        });
        // b
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_6,
            AnswerImage: x?.__EMPTY_7 == "no" ? "" : x?.__EMPTY_7,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("b") + 1)?.toString(),
            Additional: "", 
        });
        // c
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_8,
            AnswerImage: x?.__EMPTY_9 == "no" ? "" : x?.__EMPTY_9,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("c") + 1)?.toString(),
            Additional: "", 
        });
        // d
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_10,
            AnswerImage: x?.__EMPTY_11 == "no" ? "" : x?.__EMPTY_11,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("d") + 1)?.toString(),
            Additional: "", 
        });
        // e
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_12,
            AnswerImage: x?.__EMPTY_13 == "no" ? "" : x?.__EMPTY_13,
            IsCorrect: x?.__EMPTY_16?.toString()?.toLowerCase() == "a" ? "TRUE" : "FALSE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("e") + 1)?.toString(),
            Additional: "", 
        });
        // f
        mcqQuestions?.push({
            Type: "SEQUENCE",
            DifficultyLevel: x?.__EMPTY_2?.toUpperCase(),
            Question: x?.__EMPTY_3,
            Answer: x?.__EMPTY_14,
            AnswerImage: x?.__EMPTY_15 == "no" ? "" : x?.__EMPTY_15,
            IsCorrect: "TRUE",
            QuestionId: x?.__EMPTY_1,
            IsMcqQuestionImage: "FALSE",
            QuestionImage: "",
            Marks: x?.__EMPTY_17 ?? 1,
            Counter: (getCounter(x?.__EMPTY_16)?.indexOf("f") + 1)?.toString(),
            Additional: "" , 
        });
    });
    return mcqQuestions;
}

const getCounter = (answer: string) => {
    let array = answer?.replace(/\s/g, '').split(',');
    array = array?.map(element => element?.toLowerCase());
    return array
}