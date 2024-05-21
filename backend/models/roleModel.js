import mongoose from "mongoose";
const roleSchema = mongoose.Schema({
    title: {
        type: String,
        maxLength: 50,
    },
    description: {
        type: String,
        maxLength: 250,
    }
},{
    timestamp: true,
});

const Role = mongoose.model("Role", roleSchema);