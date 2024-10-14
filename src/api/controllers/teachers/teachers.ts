import { Request, Response } from 'express';
import { prisma } from '@/shared/prisma';
import { UserRole } from '../authentication/types';
import { ApiResponse } from '@/shared';

export const getAllTeachers = async (req: Request, res: Response) => {
    const userId = req.query.userId as string; // Ensure userId is treated as a string

    try {
        // Fetch accepted connections for the user
        const acceptedConnections = await prisma.connectionRequest.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
                status: 'ACCEPTED', // Ensure you have this status defined in your schema
            },
        });

        const acceptedUserIds = acceptedConnections.map(conn =>
            conn.senderId === userId ? conn.receiverId : conn.senderId
        );

        const teachers = await prisma.user.findMany({
            where: {
                role: UserRole.TEACHER,
                NOT: {
                    id: {
                        in: acceptedUserIds,
                    },
                },
            },
        });

        return ApiResponse(true, "Fetched All Teachers Successfully", teachers, 200, res);
    } catch (error) {
        console.log("getAllTeachers::error", JSON.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
};
