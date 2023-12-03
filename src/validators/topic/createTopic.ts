
import {body} from 'express-validator';

export const CreateTopicValidator = [
    body('topic').isEmpty().withMessage('Topic is required'),
];