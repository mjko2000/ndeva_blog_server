import { Request, Response } from "express";
import TopicModel from "../models/TopicModel";
import fileHandler, { deleteFile } from "../helpers/fileHandler";
import UserModel from "../models/UserModel";
import { withInternalError, withSuccess, withError } from "./constance";

export const createTopic = (req: Request, res: Response) => {
  const { name, value, image } = req.body
  if (!name || !value || !image) return withError(res, "Vui lòng điền đầy đủ thông tin")
  const {error, fileName, path} = fileHandler(image, 'images')
  if(error) return withError(res,"Không thể tải ảnh lên")
  return TopicModel.create({
    name,
    value,
    imageUrl: path
  }).then((topic) => {
    if(topic) return withSuccess(res,topic,"OK")
    withError(res,"Không thể tạo topic")
  }).catch(err => {
    console.log(err)
    withInternalError(res)
  })
}

export const removeTopic = (req: Request, res: Response) => {
  const { id } = req.body
  if (!id) return withError(res, "Vui lòng điền đầy đủ thông tin")
  return TopicModel.findById(id).then(topic => {
    if(topic) return topic.deleteOne()
    .then(() => withSuccess(res,null,"OK"))

    withError(res,"Không tìm thấy topic")
  }).catch(err => {
    console.log(err)
    withInternalError(res)
  })
}

export const deleteFileByAdmin = (req: Request, res: Response) => {
  const { path } = req.body
  if (!path) return withError(res, "Vui lòng điền đầy đủ thông tin")
  if(deleteFile(path)) return withSuccess(res,null,"OK")
  withError(res,"Fail")
}