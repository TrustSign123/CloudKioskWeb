const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlaylistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  playlistName: {
    type: String,
    require: true,
  },
  playlistContent: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);
module.exports = Playlist;
