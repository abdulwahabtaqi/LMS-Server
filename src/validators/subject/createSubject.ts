
import {body} from 'express-validator';

export const CreateSubjectValidator = [
    body('subject').isEmpty().withMessage('Subject is required'),
];