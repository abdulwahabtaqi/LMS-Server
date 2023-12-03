import { ApiResponse } from '@/shared';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return ApiResponse(false, "Validation Error", errors.array(), 400, res);
    }
    return next();
};