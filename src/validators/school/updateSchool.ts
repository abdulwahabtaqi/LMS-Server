
import {body} from 'express-validator';

export const UpdateSchoolValidator = [
    body('type').isEmpty().withMessage('Type is required'),
];