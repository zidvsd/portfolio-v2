import mongoose, { model, models, Schema } from "mongoose"

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  blogPost: {
    type: Schema.Types.ObjectId,
    ref: "Blog",
    required: false,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["global", "blog"],
    default: "global",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export const Comment =
  models.Comment || model("Comment", CommentSchema, "comments")
