import { NextFunction, Response } from "express";
import {  AuthenticatedRequest } from "../types";
import { ApiResponse } from "@/shared";
import _ from "lodash";


export const Authorization = (permission:string[]) => {
    return (req:AuthenticatedRequest, res:Response, next:NextFunction) => {
        try {
          const role = req?.user?.role;
          if(!role){
            ApiResponse(false,"Un-Authenticated, Role is not available", null, 500, res);       
          }
          if(!_?.isArray(permission)){
            ApiResponse(false,"Un-Authenticated, Role is not provided", null, 500, res);       
          }
          if(permission?.includes("admin")){
            return next();
          }
          if((permission?.some((p) => p === role))){
            return next();
          }
        } catch (error) {
            console.log("Authorization::error", JSON?.stringify(error));
          return  ApiResponse(false, "Something Went Wrong, Seems you are not authenticated while accessing", error, 500, res);       
         }
      };
};