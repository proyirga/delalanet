import mongoose from "mongoose";

const productOrServiceSchema = mongoose.Schema({
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productName: {
        type: String,
        maxLength:50,
    },
    shortDescription: {
        type: String,
        maxLength:50,
    },
    category: {
        type: String,
        maxLength:50,
    },
    availability: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    },
    likes: {
        type: Number,
        default:0,
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

const ProductOrService = mongoose.model("ProductOrService", productOrServiceSchema);

export default ProductOrService;