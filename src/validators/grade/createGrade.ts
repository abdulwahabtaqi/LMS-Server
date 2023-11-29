
import {body} from 'express-validator';

export const CreateGradeValidator = [
    body('schoolId').isEmpty().withMessage('School Type is required'),
    body('grade').isEmpty().withMessage('Grade name is required'),
];