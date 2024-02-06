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

const KioskScheduleSchema = new Schema({
  kioskContent: [KioskContentSchema],
  startDate: {
    type: String,
    default: "DD/MM/YYYY",
  },
  endDate: {
    type: String,
    default: "DD/MM/YYYY",
  },
});

const KioskSettingsSchema = new Schema({
  orientation: {
    type: String,
    default: "0",
  },
  splitScreen: {
    type: String,
    default: "1",
  },
  interval: {
    type: String,
    default: "30",
  },
  transitionTime: {
    type: String,
    default: "30",
  },
  axis: {
    type: String,
    default: "horizontal",
  },
  autoPlay: {
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
  androidId: {
    type: String,
  },
  settings: [KioskSettingsSchema],
  kioskContent: [KioskContentSchema],
  kioskSchedule: [KioskScheduleSchema],
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
