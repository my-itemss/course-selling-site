const mongoose = require("mongoose");

const connectDB = async () => {
  const mongoUrl = process.env.MONGO_URL;


  if (!mongoUrl) {
    throw new Error(" MONGO_URL is undefined. Check your .env file.");
  }

  await mongoose.connect(mongoUrl);
  console.log("database workss");
};

module.exports = connectDB;
