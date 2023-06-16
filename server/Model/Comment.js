import mongoose from "mongoose";
const commentSchema = new mongoose.Schema(
  {
    comment: String,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postId: {
      // 댓글에서 포스트를 가져올 일은 없으므로 ref는 사용하지 X. 어떤 글의 댓글인지 알기위함.
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { collection: "comments" }
);
const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
