
import {body} from 'express-validator';

export const CreateSubTopicValidator = [
    body('subTopic').isEmpty().withMessage('Sub Topic is required'),
];