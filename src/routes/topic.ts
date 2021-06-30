import { Request, Response, Router } from "express";
import { getListTopicWithPosts, detailTopic } from "../controllers/topicController";
const router = Router();

router.get('/getListTopicWithPosts', getListTopicWithPosts)

router.get('/:topic', detailTopic)

export default router;