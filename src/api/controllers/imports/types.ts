export interface FileInput {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string;
    size: number;
}
export interface CsvFileInput {
    Type: string;
    DifficultyLevel: string;
    Question: string;
    Answer: string;
    IsCorrect: string;
    MCQID: string;
    Marks: string;
}

