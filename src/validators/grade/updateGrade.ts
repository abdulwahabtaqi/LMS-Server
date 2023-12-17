
import { body } from 'express-validator';

export const UpdateGradeValidator = [
    body('grade').notEmpty().withMessage('Grade name is required'),
    body('schoolId').notEmpty().withMessage('School is required'),
];