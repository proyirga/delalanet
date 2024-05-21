import mongoose from "mongoose";

const salesSchema = mongoose.Schema({
    productForSale: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrService',
        required: true,
    },
    price: {
        type: Number,
        required: true,
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

const Sales = mongoose.model("Rents", salesSchema);

export default Sales;