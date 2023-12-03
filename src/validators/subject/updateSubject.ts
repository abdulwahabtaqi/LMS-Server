
import {body} from 'express-validator';

export const UpdateSubjectValidator = [
    body('gradeId').isEmpty().withMessage('Grade is required'),
    body('subject').isEmpty().withMessage('Subject name is required'),
];