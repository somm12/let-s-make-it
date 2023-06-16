import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    postNum: Number,
    image: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    commentNum: {
      // 댓글 개수.
      type: Number,
      default: 0,
    },
  },
  { collection: "posts" }
);
const Post = mongoose.model("Post", postSchema);
export default Post;
