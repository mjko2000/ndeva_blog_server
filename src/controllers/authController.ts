import { Request, Response } from "express";
import fileHandler from "../helpers/fileHandler";
import UserModel from "../models/UserModel";
import { withInternalError, withSuccess, withError } from "./constance";

export const signInController = (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) return withError(res, "Vui lòng điền đầy đủ thông tin")
  UserModel.findOne({ email }).select("+password").then(user => {
    if (user && user.comparePassword(password)) return withSuccess(res, {
      userInfo: {
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar
      },
      accessToken: user.generateAuthToken()
    }, "OK")
    withError(res, "Sai tên tài khoản hoặc mật khẩu")
  }).catch(err => {
    console.log(err);
    withInternalError(res)
  })
}

export const signUpController = async (req: Request, res: Response) => {
  const { email, displayName, password, rePassword } = req.body
  if (!email || !displayName || !password || !rePassword )
    return withError(res, "Vui lòng điền đầy đủ thông tin")
  if (displayName.length < 8) return withError(res, "displayName is too short")
  if (password.length < 8) return withError(res, "Password is too week")
  if (password !== rePassword) return withError(res, "Retype password is not match")
  const currentUser = await UserModel.findOne({ displayName })
  if (currentUser) return withError(res, "displayName is unavailble")
  UserModel.signUp({
    displayName,
    email,
    password
  }).then(user => {
    withSuccess(res, {
      userInfo: {
        displayName: user.displayName,
        email: user.email,
        avatar: user.avatar
      },
      accessToken: user.generateAuthToken()
    }, "OK")
  }).catch(err => {
    console.log(err);
    withInternalError(res)
  })
}

export const getInfoFromToken = async (req: Request, res: Response) => {
  const { token } = req.body
  UserModel.getFromToken(token).then(user => {
    if(user) return withSuccess(res,{
      ...user.toObject()
    },"OK")
    withInternalError(res)
  }).catch(err => {
    withInternalError(res)
  })
}