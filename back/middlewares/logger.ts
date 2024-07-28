import { NextFunction, Response } from "express";
import { LoggerReq } from "../interfaces/request";

export const loggerMiddleware = ((req:LoggerReq,res: Response,next: NextFunction) =>{
    req.time = new Date(Date.now()).toString();
    console.log(req.method,req.hostname, req.path, req.time);
    next();
});