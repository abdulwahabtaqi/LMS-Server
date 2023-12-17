
import { body } from 'express-validator';

export const UpdateSubjectValidator = [
    body('subject').notEmpty().withMessage('Subject name is required'),
    body('gradeId').notEmpty().withMessage('Grade is required'),
];