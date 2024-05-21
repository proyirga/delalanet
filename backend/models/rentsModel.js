import mongoose from "mongoose";

const rentsSchema = mongoose.Schema({
    productForRent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrService',
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentInAdvance: {
        type: Number,
        default: price,
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

const Rents = mongoose.model("Rents", rentsSchema);

export default Rents;