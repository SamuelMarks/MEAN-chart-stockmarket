// load mongoose since we need it to define a model
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const stockSchema = new Schema({
  name: String,
  code: String
});

module.exports = mongoose.model('Stock', stockSchema);
