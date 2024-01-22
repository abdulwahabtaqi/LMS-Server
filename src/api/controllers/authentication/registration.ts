import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { JWTEncryptedData, Registration, UserRole } from "./types";
import { prisma } from "@/shared/prisma";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import _ from "lodash";


export const RegistrationHandler = async (req: Request, res: Response) => {
    try {
        const { email,name,role,password } = req.body as Registration;
        let userRole = role
        if(_?.isEmpty(userRole)){
            userRole = UserRole?.TEACHER;
        }
        const user = await prisma.user.findFirst({
            where: { email: { equals: email, mode: "insensitive" }, }
        });
        if (user) {
            return ApiResponse(false, "User already exists", null, 409, res);
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = await prisma.user.create({
            data: {
                email,
                name,
                role:"ADMIN",
                password: hash
            }
        });
        const token = jwt.sign({ id: newUser?.id, email:newUser?.email, name:newUser?.name,role:newUser?.role, joinDate:newUser?.createdAt } as JWTEncryptedData, process.env.JWT_SECRET as string, { expiresIn: '1d' });
        return ApiResponse(true, "Registration successful", token, 200, res);
    }
    catch (error) {
        console.log("RegistrationHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Validation Error", error, 500, res);
    }
}