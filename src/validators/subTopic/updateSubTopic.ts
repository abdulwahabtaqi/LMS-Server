
import {body} from 'express-validator';

export const UpdateSubTopicValidator = [
    body('subTopic').isEmpty().withMessage('Sub Topic is required'),
    body('topicId').isEmpty().withMessage('Topic is required'),
];