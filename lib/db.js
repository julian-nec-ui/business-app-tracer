import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
const DATABASE_NAME = process.env.MONGODB_DB;

const MongooseCache = {
    connection: null,
    promise: null
}

const global = {
    mongoose: MongooseCache | undefined
}

let cached = global.mongoose || { connection: null, promise: null };

if (!global.mongoose) {
    global.mongoose = cached;
}


export default async function dbConnect() {

    if (!MONGODB_URI) {
        throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
    }

    if (cached.connection) {
        return cached.connection;
    }

    if (!cached.promise) {
        const opts = {
            bufferCommands: false
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
            return mongoose;
        });
    }

    try {
        cached.connection = await cached.promise;
    } catch (error) {
        cached.promise = null;
        throw error;
    }

    return cached.connection;
}