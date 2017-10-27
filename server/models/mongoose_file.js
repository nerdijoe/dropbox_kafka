const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fileSchema = new Schema({
  name: { type: String },
  path: { type: String },
  full_path: { type: String },
  type: { type: String },
  size: { type: String },
  is_starred: { type: Boolean, default: false },
  is_deleted: { type: Boolean, default: false },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
});

var File = mongoose.model('File', fileSchema);

module.exports = File;
