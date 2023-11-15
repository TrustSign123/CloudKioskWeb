const { default: userEvent } = require("@testing-library/user-event");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const SubscriptionSchema = new Schema({
  status: {
    type: Boolean,
    default: false,
  },
  validityPlan: {
    type: String,
  },
  startDate: {
    type: String,
    require: true,
  },
  expireDate: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  storage: {
    type: String,
    require: true,
  },
  cluster: {
    type: Number,
    require: true,
  },
});

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userSubscription: [SubscriptionSchema],
  hasUsedFreeTrial: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("user", UserSchema);
module.exports = User;
