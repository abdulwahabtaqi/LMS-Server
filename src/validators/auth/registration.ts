import {body} from 'express-validator';

export const RegistrationValidator = [
    body('name').isEmpty().withMessage('Full name is required'),
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password is required')
];
