import { ApiResponse } from "@/shared";
import { Request, Response } from "express";
import { prisma } from "@/shared/prisma";
import _ from "lodash";




export const DeleteSubjectHandler = async (req: Request, res: Response) => {
    try {
       const id = req.params?.id as string;
         const subject = await prisma.subject.findUnique({
              where:{
                id:id
              }
         });
            if(!subject){
                return ApiResponse(false, "Subject Not Found", null, 404, res);
            }
            await prisma.subject.delete({
                where:{
                    id:id
                }
            });
            return ApiResponse(true, "Subject Deleted Successfully", null, 200, res);
    }
    catch (error) {
        console.log("DeleteSubjectHandler::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong", error, 500, res);
    }
}