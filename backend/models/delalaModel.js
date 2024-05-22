import mongoose from "mongoose";

const delalaSchema = mongoose.Schema({
    delala: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comission: {
        type: Number,
    },
    license: {
        type: Document,
    },
},
{
    timestamp: true,
});

const Delala = mongoose.model("Delala", delalaSchema);

export default Delala;