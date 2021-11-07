const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    pattern: {
        type: String
    },
    occasion: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function (price) {
                return price > 0
            },
            message: `Enter a valid price!`,
        },
    },
    discount: {
        type: Number,
        validate: {
            validator: function (discount) {
                return (discount > 0 && discount <= 100) || discount === null
            },
            message: `Enter a valid discount!`,
        },
    },
    rating: {
        type: Number
    },
    imageUrl: {
        type: String,
        required: true
    }
});

const Item = mongoose.model('items', ItemSchema)

module.exports = Item 