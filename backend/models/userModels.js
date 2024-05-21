import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobilenumber: {
        type: String,
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
    },
    profilePic: {
        type: String,
        default: "",
    },
    followers: {
        type: [String],
        default: [],
    },
    following: {
        type: [String],
        default: [],
    },
    bio: {
        type: String,
        default: "",
    },
    verified: {
        type: Boolean,
        default: false,
    },
    reviews: [
        {
            rated: {
                type: Boolean,
                default: false,
            },
            rategiven: {
                type: Number,
            }
        }
    ]
},
    {
        timestamps: true,
    });

const User = mongoose.model('User', userSchema);

export default User;