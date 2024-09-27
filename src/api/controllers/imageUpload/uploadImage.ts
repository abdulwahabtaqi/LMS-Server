import { ApiResponse } from "@/shared";
import { Request, Response, NextFunction } from "express";
import { v2 as cloudinary } from "cloudinary";

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const image = req.body.image

        const result = await cloudinary.uploader.upload(image, {
            folder: "mcqs",
            transformation: [{ width: 500, height: 500, crop: "limit" }]
        })
        console.log(result)

        return ApiResponse(true, "Image uploaded successfully", result.secure_url, 200, res);
    } catch (error) {
        console.error("UploadImage::error", JSON.stringify(error));
        return ApiResponse(false, "Error uploading image to Cloudinary", error, 500, res);
    }
};
