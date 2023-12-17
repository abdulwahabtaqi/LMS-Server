
import { body } from 'express-validator';

export const CreateSubTopicValidator = [
    body('subTopic').notEmpty().withMessage('Sub Topic is required'),
    body('topicId').notEmpty().withMessage('Topic is required'),
];