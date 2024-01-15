const mongoose = require("mongoose");
const { Schema } = mongoose;

const KioskContentSchema = new Schema({
  KioskContent: {
    type: String,
    required: true,
  },
  KioskContentFileType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const KioskSettingsSchema = new Schema({
  orientation: {
    type: String,
    default: "0",
  },
  interval: {
    type: String,
    default: "30",
  },
  transition: {
    type: Boolean,
    default: true,
  },
});

const KioskSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  kioskName: {
    type: String,
    require: true,
  },
  kioskCode: {
    type: String,
    require: true,
  },
  settings: [KioskSettingsSchema],
  kioskContent: [KioskContentSchema],
  groupName: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Kiosk = mongoose.model("Kiosk", KioskSchema);
module.exports = Kiosk;
