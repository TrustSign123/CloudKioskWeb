const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  groupName: {
    type: String,
    require: true,
  },
  groupScreens: [Object],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
