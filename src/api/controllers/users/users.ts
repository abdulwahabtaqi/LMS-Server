import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import { ApiResponse } from "@/shared";
import bcrypt from 'bcryptjs';


export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return ApiResponse(true, "Retrieved users", users, 200, res);
    } catch (error) {
        console.error("Error fetching users:", error);
        return ApiResponse(false, "Error Fetching users", error.message, 500, res);
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await prisma.user.delete({
            where: {
                id
            }
        });
        return ApiResponse(true, "User deleted successfully", user, 200, res);
    } catch (error) {
        console.error("Error deleting user:", error);
        return ApiResponse(false, "Error deleting user", error.message, 500, res);
    }
};

export const getSingleUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!user) {
            return ApiResponse(false, "User not found", null, 404, res);
        }
        return ApiResponse(true, "User retrieved successfully", user, 200, res);
    } catch (error) {
        console.error("Error fetching user:", error);
        return ApiResponse(false, "Error fetching user", error.message, 500, res);
    }
};


export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const { name, email, role, password } = req.body;

        let dataToUpdate: any = {
            name,
            email,
            role,
        };

        if (password) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            dataToUpdate.password = hash;
        }


        const user = await prisma.user.update({
            where: { id },
            data: dataToUpdate,
        });

        return ApiResponse(true, "User updated successfully", user, 200, res);
    } catch (error) {
        console.error("Error updating user:", error);
        return ApiResponse(false, "Error updating user", error.message, 500, res);
    }
};

export const approveUser = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.update({
            where: { id },
            data: {
                approved: true,
            }
        });
        if (!user) {
            return ApiResponse(false, "User not found", null, 404, res);
        }
        return ApiResponse(true, "User approved successfully", user, 200, res);
    } catch (error) {
        console.error("Error updating user:", error);
        return ApiResponse(false, "Error approving user", error.message, 500, res);
    }
};
export const unapprovedUser = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany({
            where: {
                approved: false,
            }, orderBy: {
                createdAt: 'desc',
            },
        });
        return ApiResponse(true, "Unapproved users retrieved successfully", users, 200, res);
    } catch (error) {
        console.error("Error retrieving unapproved users:", error);
        return ApiResponse(false, "Error retrieving unapproved users", error.message, 500, res);
    }
};
