
import {body} from 'express-validator';

export const UpdateSubjectValidator = [
    body('subject').notEmpty().withMessage('Subject name is required'),
];