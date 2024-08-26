const express = require("express");
const mongoose = require("mongoose");
const { startCronJobs } = require("./jobs/index.js");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const newsRoutes = require("./routes/news");
require("dotenv").config();
const app = express();
app.use(express.json());

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://admin:${process.env.DB_PASSWORD}@trendingtimesapi.l72ul6k.mongodb.net/News-API?retryWrites=true&w=majority&appName=TrendingTimesAPI`
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
  }
};
connectDB();
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/news", newsRoutes);

startCronJobs();

app.listen(process.env.PORT, () => {
  console.log(`Server Started on port ${port}`);
});
