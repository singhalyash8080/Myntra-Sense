const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchingSchema = new Schema({
    item1_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'items'
    },
    item2_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'items'
    },
    score: {
        type: Number
    }
});

const Matching = mongoose.model('matchings', matchingSchema)

module.exports = Matching