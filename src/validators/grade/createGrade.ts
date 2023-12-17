
import { body } from 'express-validator';

export const CreateGradeValidator = [
    body('schoolId').notEmpty().withMessage('School Type is required'),
    body('grade').notEmpty().withMessage('Grade name is required'),
];