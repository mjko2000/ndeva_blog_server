import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
const router = Router();

router.get('/getListTopic', async (req,res) => {
  const listPost: any = []
  const rand = Math.floor(Math.random()*10)
  for (let i = 0; i < 11; i++) {
    listPost.push({
      id: i.toString(),
      title: await fetch("http://metaphorpsum.com/sentences/"+rand).then(reponse => reponse.text()),
      content: await fetch("http://metaphorpsum.com/paragraphs/"+rand).then(reponse => reponse.text()),
      thumbnailUrl: `https://picsum.photos/id/${i+rand}/1000/600`
    })
  }
  res.status(200).json({
    resultCode: 1,
    data: [
      {
        id: 0,
        title: "First topic",
        url: "love",
        thumbnailUrl: `https://picsum.photos/id/${6}/3000/1600`,
        listPost
      },
      {
        id: 1,
        title: "Second topic",
        url: "hate",
        thumbnailUrl: `https://picsum.photos/id/${7}/3000/1600`,
        listPost
      },
      {
        id: 2,
        title: "Third topic",
        url: "boo",
        thumbnailUrl: `https://picsum.photos/id/${8}/3000/1600`,
        listPost
      }
    ]
  })
})

router.get('/:topic',async (req,res) => {
  const listPost: any = []
  const rand = Math.floor(Math.random()*10)
  for (let i = 0; i < 11; i++) {
    listPost.push({
      id: i.toString(),
      title: await fetch("http://metaphorpsum.com/sentences/"+rand).then(reponse => reponse.text()),
      content: await fetch("http://metaphorpsum.com/paragraphs/"+rand).then(reponse => reponse.text()),
      thumbnailUrl: `https://picsum.photos/id/${i+rand}/1000/600`
    })
  }
  const {topic} = req.params
  res.status(200).json({
    resultCode: 1,
    data: {
      id: 0,
      title: topic,
      url: topic,
      thumbnailUrl: `https://picsum.photos/id/${12}/3000/1600`,
      listPost
    }
  })
})

export default router;