const { mongoose } = require("mongoose");


const { Schema } = mongoose;

const CarSchema = new Schema({
    model: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    noOfCopies: {
        type: Number,
        required: true,
    },
    carImages: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Car", CarSchema);