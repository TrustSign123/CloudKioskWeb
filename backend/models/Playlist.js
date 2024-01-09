const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistContentSchema = new Schema({
  playlistContent: {
    type: String,
    required: true,
  },
  playlistContentFileType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PlaylistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  playlistName: {
    type: String,
    require: true,
  },
  playlistContent: [PlaylistContentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
