import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import jwtHelper from '../helpers/jwtHelper'
import { Request, Response, NextFunction } from "express";
import { UserAuthData } from '../models/UserModel';
import { withError } from '../controllers/constance';
const SECRET_KEY = process.env.SECRET_KEY || "NDEVAAAAAAAAA"
export interface RequestWithAuth extends Request{
  authData: UserAuthData
}
export const isAuth = async (req: RequestWithAuth, res: Response, next:NextFunction) => {
  let tokenFromClient = req.headers["authorization"];
  if (tokenFromClient) {
    tokenFromClient = tokenFromClient.slice(7, tokenFromClient.length)
    try {
      const decoded = await jwtHelper.verifyToken(tokenFromClient, SECRET_KEY);
      req.authData = decoded;
      next();
    } catch (error) {
      return withError(res,"Không thể xác thực")
    }
  } else {
    return withError(res, "Không thể xác thực")
  }
}