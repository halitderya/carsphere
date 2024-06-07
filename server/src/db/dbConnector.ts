import mongoose, { ConnectOptions } from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb://myadmin:mypassword@195.20.255.56:27018/",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "carsphere",
      } as ConnectOptions
    );
    console.log("📖 Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
