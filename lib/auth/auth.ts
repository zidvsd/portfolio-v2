import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

const client = new MongoClient(process.env.MONGODB_URI!)
const db = client.db("portfolio_v2")

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: "http://localhost:3000/",
  emailAndPassword: { enabled: true, autoSignIn: false },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID! as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET! as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID! as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
    },
  },
})
