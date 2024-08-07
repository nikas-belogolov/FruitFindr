// import mongoose from "mongoose";
const mongoose = require('mongoose')
mongoose.ObjectId.get(v => v.toString());

declare global {
    var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGO_URI = process.env.MONGO_URI!;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME!;

if (!MONGO_URI || !MONGO_DB_NAME) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env",
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}


async function dbConnect() {
    if (cached.conn) {
      return cached.conn;
    }
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
        dbName: MONGO_DB_NAME
      };
      cached.promise = mongoose.connect(MONGO_URI, opts).then((mongoose) => {
        return mongoose;
      });
    }
    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }
  
    return cached.conn;
  }
  
  export default dbConnect;