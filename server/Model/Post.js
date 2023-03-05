import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
  },
  { collection: "posts" }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
