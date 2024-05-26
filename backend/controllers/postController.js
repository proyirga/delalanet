import User from "../models/userModel.js";
import Post from "../models/postModel.js";

const createPost = async (req, res) => {
    const {createdBy, title, shortDescription, price, negotiable, image} = req.body;
    try {
        if(!createdBy || !title || !shortDescription || !price){
            return res.status(400).json({message: "Complete all required fields!"});
        }

        const user =await User.findById(createdBy);
        if(!user){
            return res.status(400).json({message: "User not found!"});
        }
        if(user._id.toString() !== req.user._id.toString()){
            return res.status(400).json({message: "Unauthorized action!"});
        }

        const maxLength = 250;
        if(shortDescription.length > maxLength){
            return res.status(400).json({message: `Text must be less than ${maxLength} characters long!`})
        }

        const newPost = new Post({createdBy, title, shortDescription, price, negotiable, image});
        await newPost.save();
        res.status(200).json({message: "Post has been added successfully!", newPost});
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error createPost: ", err.message);
    }
}

const getPost = async(req,res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({message: "Not found!"});
        }
        res.status(200).json({post});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const deletePost = async(req,res)=>{
    try {
        const post = await post.findById(req.params.id)
        if(!post){
            return res.status(404).json({message: "Not found!"});
        }
        if(post.createdBy.toString() !== req.user._id.toString()){
            return res.status(401).json({message: "Unauthorized to delete post!"});
        }

        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post deleted successfully"});

    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

const likeUnlikePost = async(req, res)=>{
    try {
        const {id:postId} = req.params;
        const userId = req.user._id;

        const post = await Post.findById(postId);

        if(!post){
            return res.status(404).json({message: "Post not found!"});
        }

        const liked = post.likes.includes(userId);

        if(liked){
            //Unlike action goes here.
            await Post.updateOne({_id:postId}, {$pull: {likes: userId}});
            res.status(200).json({message: "You disliked successfully!"});
        }else{
            //Like action goes here.
            post.likes.push(userId);
            await post.save();
            res.status(200).json({message: "You liked successfully!"});
        }
    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error createPost: ", err.message);
    }
}

const replyToPost = async(req,res)=>{
    try {
        const {text} = req.body;
        const postId = req.params.id;
        const userId = req.user._id;
        const userProfilePic = req.user.profilePic;
        const username = req.user.username;

        if(!text){
            return res.status(404).json({message: "Text field is required"});
        }
        const post =await Post.findById(postId);
        if(!post){
            return res.status(404).json({message: "Post not found!"});
        }

        const reply = {postId, userId, text, userProfilePic, username};

        post.replies.push(reply);
        await post.save();

        res.status(200).json({message: "Successfully replied to apost!", post});

    } catch (err) {
        res.status(500).json({message: err.message});
        console.log("Error replyToPost: ", err.message);
    }
}

const feedsPost = async(req,res)=>{
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message: "User Not Found!"});
        }

        const following = user.following;

        const feedPosts = await Post.find({postedBy: {$in:following}}).sort({createdAt: -1});
        res.status(200).json({feedPosts});
    } catch (err) {
        res.status(500).json({message: err.message})
    }
}

export {createPost, getPost, deletePost, likeUnlikePost, replyToPost, feedsPost};