
import { body } from 'express-validator';

export const CreateSubjectValidator = [
    body('subject').notEmpty().withMessage('Subject name is required'),
    body('gradeId').notEmpty().withMessage('Grade is required'),
];