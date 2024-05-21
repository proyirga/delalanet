import mongoose from "mongoose";

const jobsSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    salary: {
        type: Number,
    },
    jobTitle: {
        type: String,
        maxLength: 50,
    },
    jobDescription: {
        type: String,
        maxLength: 5000,
    },
    deadline: {
        type: Date,
    },
    availability: {
        type: String,
        maxLength: 50,
        default: "current"
    },
},
{
    timestamp: true,
});

const Jobs = mongoose.model("Rents", jobsSchema);

export default Jobs;