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

const KioskCodeSchema = new Schema({
  KioskCode: {
    type: String,
    required: true,
  },
  androidId: {
    type: String,
  },
  settings: [KioskSettingsSchema],
  lastSynced: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    default: false,
  },
  kioskContent: [KioskContentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const KioskCode = mongoose.model("KioskCode", KioskCodeSchema);

module.exports = KioskCode;
