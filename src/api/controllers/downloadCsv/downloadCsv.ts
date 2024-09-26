import { Request, Response } from 'express';
import path from 'path';
import { ApiResponse } from "@/shared";

export const downloadCsv = async (req: Request, res: Response) => {
    try {
        const filePath = path.join(__dirname, "../../../uploads/sample_csv_template.csv");

        // Send the file for download
        return res.download(filePath, 'sample_csv_template.csv', (err) => {
            if (err) {
                console.error("Error downloading the file:", err);
                ApiResponse(false, "Error downloading the file", err, 500, res);
                return
            }
        });
    } catch (error) {
        console.error("downloadCsv::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
};
