const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URL;

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully");
  } catch (error) {
    console.error(error);
  }
};

module.exports = connectToMongo;
