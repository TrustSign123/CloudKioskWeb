const mongoose = require("mongoose");
const { Schema } = mongoose;

const mediaSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  mediaContent: {
    type: String,
    required: true,
  },
  mediaContentName: {
    type: String,
  },
  mediaContentFileName: {
    type: String,
  },
  mediaContentFileSize: {
    type: Number,
  },
  mediaContentFileType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Media = mongoose.model("Media", mediaSchema);
module.exports = Media;
