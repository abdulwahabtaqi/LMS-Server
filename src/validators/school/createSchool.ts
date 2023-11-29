
import {body} from 'express-validator';

export const CreateSchoolValidator = [
    body('type').isEmpty().withMessage('Type is required'),
];