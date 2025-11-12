import { Request } from "express";
import { User } from "./user";

export interface LoggerReq extends Request {
  time?: string;
}

export interface UserReq<Body = any> extends Request<any, any, Body, any> {
  user: User;
}
