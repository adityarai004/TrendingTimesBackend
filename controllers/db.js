const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
      await mongoose.connect("mongodb+srv://admin:Pass123456@trendingtimesapi.l72ul6k.mongodb.net/News-API?retryWrites=true&w=majority&appName=TrendingTimesAPI");
      console.log('Connected to MongoDB');
    } catch (error) {
      console.log('Error connecting to MongoDB:', error);
    }
  };
  

module.exports = connectDB