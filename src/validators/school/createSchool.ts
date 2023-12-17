
import { body } from 'express-validator';

export const CreateSchoolValidator = [
    body('type').notEmpty().withMessage('Type is required'),
];