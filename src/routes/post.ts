import { Request, Response, Router } from "express";
import fetch from 'node-fetch'
const router = Router();

router.get('/getListPost', async (req: Request, res: Response) => {
  const data: any = []
  const {topic} = req.params
  const rand = Math.floor(Math.random()*10)
  for (let i = 0; i < 11; i++) {
    data.push({
      id: i.toString(),
      title: await fetch("http://metaphorpsum.com/sentences/"+rand).then(reponse => reponse.text()),
      content: await fetch("http://metaphorpsum.com/paragraphs/"+rand).then(reponse => reponse.text()),
      thumbnailUrl: `https://picsum.photos/id/${i+rand}/1000/600`
    })
  }
  res.status(200).json({
    resultCode: 1,
    data
  })
})

router.get('/:id', async (req: Request, res: Response) => {
  const {id} = req.params
  function stripScripts(text: string) {
    var SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    while (SCRIPT_REGEX.test(text)) {
        text = text.replace(SCRIPT_REGEX, "");
    }
    return text;
  }
  const data = {
    id,
    thumbnailUrl: `https://picsum.photos/id/${id}/3000/1600`,
    title: await fetch("http://metaphorpsum.com/sentences/1").then(reponse => reponse.text()),
    content: stripScripts('<script type="text/javascript">alert("ASDASD")</script>' + await fetch("http://metaphorpsum.com/paragraphs/8?p=true").then(reponse => reponse.text()) )
  }
  res.status(200).json({
    resultCode: 1,
    data
  })
})

export default router