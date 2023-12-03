import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
    const uri = "mongodb://127.0.0.1:27017/rowerowe-narty";
    await mongoose.connect(uri)

    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection error with MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
