
import { body } from 'express-validator';

export const CreateTopicValidator = [
    body('topic').notEmpty().withMessage('Topic is required'),
    body('subjectId').notEmpty().withMessage('Subject is required'),
];