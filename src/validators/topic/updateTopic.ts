
import { body } from 'express-validator';

export const UpdateTopicValidator = [
    body('topic').notEmpty().withMessage('Topic is required'),
    body('subjectId').notEmpty().withMessage('Subject is required'),
];