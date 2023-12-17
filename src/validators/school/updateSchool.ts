
import { body } from 'express-validator';

export const UpdateSchoolValidator = [
    body('type').notEmpty().withMessage('Type is required'),
];