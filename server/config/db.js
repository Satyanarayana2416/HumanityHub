const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Override default DNS servers to use Google DNS, which bypasses SRV ECONNREFUSED issues on strict networks
    require('dns').setServers(['8.8.8.8', '1.1.1.1']);
    
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
