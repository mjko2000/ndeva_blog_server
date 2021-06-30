import { Request, Response } from "express";
import TopicModel from "../models/TopicModel";
import fileHandler, { createHtmlByString } from "../helpers/fileHandler";
import UserModel from "../models/UserModel";
import { withInternalError, withSuccess, withError } from "./constance";
import fetch from 'node-fetch'
import PostModel from "../models/PostModel";
import { RequestWithAuth } from "src/middleware/authMiddleware";
import fs from 'fs'
function stripScripts(text: string) {
  var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  while (SCRIPT_REGEX.test(text)) {
    text = text.replace(SCRIPT_REGEX, "");
  }
  return text;
}

export const detailPost = async (req: Request, res: Response) => {
  const { id } = req.params
  const listPost: any = []
  PostModel.findById(id).then(post => {
    if(!post) withError(res,"Không tìm thấy post")
    fs.readFile('./files/'+post.contentUrl,'utf8',(err,html) => {
      if(err) withError(res,"Không tìm thấy post")
      withSuccess(res, {
        id: post.id,
        title: post.title,
        intro: post.intro,
        content: html,
        thumbnailUrl: post.thumbnailUrl,
        topic: "love"
      }, "OK")
    })
  })
}

export const createPost = async (req: RequestWithAuth, res: Response) => {
  const { title, intro, thumbnail, content, topicId } = req.body
  if (!title || !intro || !thumbnail || !content || !topicId) withError(res, "Vui lòng điền đầy đủ thông tin")
  UserModel.findById(req.authData.id).then(user => {
    if (!user) withError(res, "Không tồn tại người dùng!")
    TopicModel.findById(topicId).then(topic => {
      if (!topic) withError(res, "Topic không tồn tại")
      const { error: imageErr, path, fileName } = fileHandler(thumbnail, 'images')
      if (imageErr) withInternalError(res)

      const { error: htmlErr, path: htmlPath } = createHtmlByString(stripScripts(content))
      if (htmlErr) withInternalError(res)

      PostModel.create({
        title,
        intro,
        thumbnailUrl: path,
        contentUrl: htmlPath,
        topic: topic._id,
        createBy: user._id
      }).then(post => {
        withSuccess(res, post.toJSON(), "OK")
        topic.postCount++;
        topic.save()
      }).catch(err => {
        console.log(err)
        withInternalError(res)
      })
    })
  })
}