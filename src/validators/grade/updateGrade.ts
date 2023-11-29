
import {body} from 'express-validator';

export const UpdateGradeValidator = [
    body('grade').isEmpty().withMessage('Grade name is required'),
];