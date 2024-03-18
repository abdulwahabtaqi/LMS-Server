import { ApiResponse } from "@/shared";
import { prisma } from "@/shared/prisma";
import { ExportedQuestionStatus } from "@prisma/client";
import { Request, Response } from "express";





export const removeDownloadHistoryCommandHandler = async (req: Request, res: Response) => {
    try {
        console.log("removeDownloadHistoryCommandHandler::req.params", req?.params);
        const removeHistory = await prisma.exportedQuestion.update({
            where: { id: req?.params?.id as string },
            data: {
                status: ExportedQuestionStatus.DELETED
            }
        });
        return ApiResponse(true, "History Removed Successfully", removeHistory, 200, res);
    }
    catch (error) {
        console.log("removeDownloadHistoryCommandHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}