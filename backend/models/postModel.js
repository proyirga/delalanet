import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        maxLength:50,
    },
    shortDescription: {
        type: String,
        maxLength:250,
    },
    price: {
        type: Number,
    },
    negotiable: {
        type: Boolean,
        default: false,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        default: [],
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic:{
                type: String,
            },
            username:{
                type: String,

            }
        }
    ]
},
{
    timestamp: true,
});

const Post = mongoose.model("Post", postSchema);

export default Post;