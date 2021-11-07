const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sizeSchema = new Schema({
  item_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'item'
  },
  size: {
    type: String,
    required: true
  }
})

const Size = mongoose.model('sizes', sizeSchema)

module.exports = Size