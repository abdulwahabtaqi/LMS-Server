
import { body } from 'express-validator';

export const UpdateSubTopicValidator = [
    body('subTopic').notEmpty().withMessage('Sub Topic is required'),
    body('topicId').notEmpty().withMessage('Topic is required'),
];