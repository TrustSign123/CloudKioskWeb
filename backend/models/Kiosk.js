const mongoose = require("mongoose");
const { Schema } = mongoose;

const KioskContentSchema = new Schema({
  KioskContent: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
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
  kioskContent: [KioskContentSchema],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Kiosk = mongoose.model("Kiosk", KioskSchema);
module.exports = Kiosk;
