
import {body} from 'express-validator';

export const UpdateTopicValidator = [
    body('topic').isEmpty().withMessage('Topic is required'),
    body('subjectId').isEmpty().withMessage('Subject is required'),
];