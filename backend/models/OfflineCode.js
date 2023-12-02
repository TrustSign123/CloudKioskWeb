const mongoose = require("mongoose");
const { Schema } = mongoose;

const OfflineKioskCodeSchema = new Schema({
  OfflineKioskCode: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const OfflineKioskCode = mongoose.model("OfflineKioskCode", OfflineKioskCodeSchema);

module.exports = OfflineKioskCode;
