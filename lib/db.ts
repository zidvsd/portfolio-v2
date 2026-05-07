import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable")
}

const globalWithMongoose = global as typeof globalThis & {
  mongoose: {
    conn: mongoose.Connection | null
    promise: Promise<typeof mongoose> | null
  }
}

// Persist to global so it doesnt create new connections
if (!globalWithMongoose.mongoose) {
  globalWithMongoose.mongoose = { conn: null, promise: null }
}

const cached = globalWithMongoose.mongoose

export async function connectDb() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      maxPoolSize: 5, // ✅ Hard cap on connections
      minPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 30000,
    })
  }
  try {
    cached.conn = (await cached.promise).connection
  } catch (err) {
    cached.promise = null
    throw err
  }
  return cached.conn
}
