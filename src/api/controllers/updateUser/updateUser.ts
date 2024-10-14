import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";

export const updateUser = async (req: Request, res: Response) => {
    const { userId, email, name, password, profileImage } = req.body; // Extracting data including profileImage

    try {
        let profileImageUrl: string | undefined;

        // Upload image to Cloudinary if a base64 image is provided
        if (profileImage) {
            const result = await cloudinary.uploader.upload(profileImage, {
                folder: "profile",
                transformation: [{ width: 500, height: 500, crop: "limit" }],
            });
            profileImageUrl = result.secure_url; // Get the secure URL of the uploaded image
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            return ApiResponse(false, "User not found", null, 404, res);
        }

        const updatedData: any = {
            name,
            email,
            updatedAt: new Date(), // Set updatedAt to current time
        };

        if (profileImageUrl) {
            updatedData.profileImage = profileImageUrl; // Store the Cloudinary URL
        }

        if (password && password !== user.password) { // Check if the password is provided and different from the current password
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            updatedData.password = hash; // Hash the new password
        }

        // Update the user in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: updatedData,
        });

        return ApiResponse(true, "User updated successfully", updatedUser, 200, res);
    } catch (error) {
        console.log("updateUser::error", JSON.stringify(error));
        return ApiResponse(false, "Something went wrong", error, 500, res);
    }
};
