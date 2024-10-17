import { ApiResponse } from "@/shared";
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/shared/prisma";

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = req.body.image

        const result = await cloudinary.uploader.upload(image, {
            folder: "mcqs",
            transformation: [{ width: 500, height: 500, crop: "limit" }]
        })


        const savedImage = await prisma.image.create({
            data: {
                urls: [result.secure_url],
            },
        });

        return ApiResponse(true, "Image uploaded successfully", result.secure_url, 200, res);
    } catch (error) {
        console.error("UploadImage::error", JSON.stringify(error));
        return ApiResponse(false, "Error uploading image to Cloudinary", error, 500, res);
    }
};



export const getAllImages = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const images = await prisma.image.findMany();

        return ApiResponse(true, "Images retrieved successfully", images, 200, res);
    } catch (error) {
        console.error("getAllImages::error", JSON.stringify(error));
        return ApiResponse(false, "Error retrieving images from the database", error, 500, res);
    }
};
export const deleteImage = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const numericId = parseInt(id, 10);
        if (isNaN(numericId)) {
            return ApiResponse(false, "Invalid ID format", null, 400, res);
        }

        const imageRecord = await prisma.image.findUnique({
            where: { id: numericId },
        });

        if (!imageRecord || !imageRecord.urls || imageRecord.urls.length === 0) {
            return ApiResponse(false, "Image not found", null, 404, res);
        }

        const publicId = imageRecord.urls[0].split("/").pop()?.split(".")[0];

        if (!publicId) {
            return ApiResponse(false, "Public ID could not be determined", null, 500, res);
        }

        await cloudinary.uploader.destroy(`mcqs/${publicId}`);

        await prisma.image.delete({
            where: { id: numericId },
        });

        return ApiResponse(true, "Image deleted successfully", null, 200, res);
    } catch (error: unknown) {
        console.error("deleteImage::error", JSON.stringify(error));
        const errorMessage = (error instanceof Error) ? error.message : "Error deleting image";
        return ApiResponse(false, errorMessage, null, 500, res);
    }
};