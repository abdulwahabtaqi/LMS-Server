import { NextFunction, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AuthenticatedRequest } from "../types";
import { ApiResponse } from "@/shared";

export const Authentication = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization as string;
        if (!token) {
            return res.status(404).json({ status: false, msg: "Token is missing", data: null });
        }
        const verify = jwt.verify(token, process?.env?.JWT_SECRET as Secret);
        if (!verify) {
            return res.status(401).json({ status: false, msg: "Un-Authorize", data: null })
        }
        console.log("Authentication::verify", verify);
        req.user = verify as AuthenticatedRequest["user"];
        return next();
    } catch (error) {
        console.log("Authentication::error", JSON?.stringify(error));
        return ApiResponse(false, "Something Went Wrong, Seems you are not authenticated while accessing", null, 500, res);
    }
};