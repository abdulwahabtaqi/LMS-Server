import { Request, Response } from 'express';;
import { prisma } from '@/shared/prisma';
import { UserRole } from '../authentication/types';
import { ApiResponse } from '@/shared';


export const getAllTeachers = async (req: Request, res: Response) => {
    try {
        const teachers = await prisma.user.findMany({
            where: { role: UserRole.TEACHER }
        });
        return ApiResponse(true, "Fetched All Teachers Successfully", teachers, 200, res);
    } catch (error) {
        console.log("getAllTeachers::error", JSON.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
};
