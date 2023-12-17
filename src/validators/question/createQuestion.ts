
import { body } from 'express-validator';

export const CreateQuestionValidator = [
    body('subTopicId').notEmpty().withMessage('Sub Topic is required'),
    body('question').notEmpty().withMessage('Question is required'),
    body('type').notEmpty().withMessage('Type is required'),
    body('difficultyLevel').notEmpty().withMessage('Difficulty is required'),
];