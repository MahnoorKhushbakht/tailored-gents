
import mongoose from 'mongoose';

const connection = {};
const uri = process.env.NEXT_PUBLIC_DB_URL;
async function dbConnect() {
  if (connection.isConnected) {
    return;
  }

 const db = await mongoose.connect(uri,{ 
    serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    connectTimeoutMS: 5000, // 5 seconds timeout
    socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
  });

  connection.isConnected = db.connections[0].readyState;
}

export default dbConnect;


