import { Document, Types } from "mongoose"
export interface IUser extends Document {
  name: string
  email: string
  emailVerified: boolean
  image?: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}
export interface IUserDocument extends IUser, Document {
  _id: Types.ObjectId
}
