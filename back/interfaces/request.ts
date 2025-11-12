import { Request } from "express";
import { User } from "./user";

export interface LoggerReq extends Request {
  time?: string;
}

export interface UserReq extends Request {
  user: User;
}
