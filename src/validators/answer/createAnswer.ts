
import { body } from 'express-validator';

export const CreateAnswerValidator = [
    body('questionId').notEmpty().withMessage('Question is required'),
    body('answer').notEmpty().withMessage('Answer is required'),
    body('isCorrect').notEmpty().withMessage('Is Correct is required'),
];