import { Request, Response } from "express";
import TopicModel from "../models/TopicModel";
import fileHandler from "../helpers/fileHandler";
import UserModel from "../models/UserModel";
import { withInternalError, withSuccess, withError } from "./constance";
import fetch from 'node-fetch'
import PostModel from "../models/PostModel";

export const getListTopicWithPosts = async (req: Request, res: Response) => {
  const listPost: any = []
  const rand = Math.floor(Math.random() * 10)
  // for (let i = 0; i < 11; i++) {
  //   listPost.push({
  //     id: i.toString(),
  //     title: await fetch("http://metaphorpsum.com/sentences/" + rand).then(reponse => reponse.text()),
  //     intro: await fetch("http://metaphorpsum.com/paragraphs/" + rand).then(reponse => reponse.text()),
  //     thumbnailUrl: `https://picsum.photos/id/${i + rand}/1000/600`
  //   })
  // }
  TopicModel.find().then(async topics => {
    const data: any[] = [] 
    for(const topic of topics){
      data.push({
        id: topic.id,
        title: topic.name,
        url: topic.value,
        thumbnailUrl: topic.imageUrl,
        listPost: await PostModel.find({topic: topic._id}).then(posts => posts.map(post => ({
          id: post.id,
          title: post.title,
          intro: post.intro,
          thumbnailUrl: post.thumbnailUrl,
          createdAt: post.createdAt
        })))
      })
    }
    withSuccess(res,data,"OK")
  }).catch(err => {
    console.log(err);
    withInternalError(res)
  })
}

export const detailTopic = async (req: Request, res: Response) => {
  const {topic: topicValue} = req.params;

  TopicModel.findOne({value: topicValue}).then(topic => {
    PostModel.find({topic: topic._id}).then(posts => {
      withSuccess(res,{
        id: 0,
        title: topic.name,
        url: topic.value,
        thumbnailUrl: topic.imageUrl,
        listPost: posts.map(post => ({
          id: post.id,
          title: post.title,
          intro: post.intro,
          thumbnailUrl: post.thumbnailUrl,
          createAt: post.createdAt,
          createBy: post.createBy
        }))
      },"OK")
    })
  })

  // const listPost: any = []
  // const rand = Math.floor(Math.random() * 10)
  // listPost.push({
  //   id: 11,
  //   title: "New Title at 12:53 AM",
  //   content: await fetch("http://metaphorpsum.com/paragraphs/" + rand).then(reponse => reponse.text()),
  //   thumbnailUrl: `https://picsum.photos/id/${rand}/1000/600`
  // })
  // for (let i = 0; i < 11; i++) {
  //   listPost.push({
  //     id: i.toString(),
  //     title: await fetch("http://metaphorpsum.com/sentences/" + rand).then(reponse => reponse.text()),
  //     content: await fetch("http://metaphorpsum.com/paragraphs/" + rand).then(reponse => reponse.text()),
  //     thumbnailUrl: `https://picsum.photos/id/${i + rand}/1000/600`
  //   })
  // }
  // const { topic } = req.params
  // TopicModel.findOne({}).then(topics => {
  //   withSuccess(res,{
  //     id: 0,
  //     title: topic,
  //     url: topic,
  //     thumbnailUrl: topics.imageUrl,
  //     listPost
  //   },"OK")
  // }).catch(err => {
  //   console.log(err);
  //   withInternalError(res)
  // })
}