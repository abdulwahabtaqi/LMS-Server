import {body} from 'express-validator';

export const LoginValidator = [
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({min: 6}).withMessage('Password is required')
];