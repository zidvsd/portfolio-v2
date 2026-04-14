import mongoose, { Schema, models, model } from "mongoose"
import { IUserDocument } from "@/lib/types/user"

const UserSchema = new Schema<IUserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    emailVerified: { type: Boolean, default: false },
    image: { type: String, default: "" },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
)

const User = models.User || model<IUserDocument>("User", UserSchema, "user")

export default User
