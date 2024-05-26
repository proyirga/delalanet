import express from "express";
import { createPost, deletePost, feedsPost, getPost, likeUnlikePost, replyToPost } from "../controllers/postController.js";
import protectRoute from "../middlewares/protectRoute.js";

const router = express()

router.get("/feed", protectRoute, feedsPost);
router.get("/:id", protectRoute, getPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlikePost);
router.post("/reply/:id", protectRoute, replyToPost);


export default router;