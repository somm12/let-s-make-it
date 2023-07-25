import express from "express";
import Post from "../Model/Post.js";
import User from "../Model/User.js";
import Comment from "../Model/Comment.js";
const router = express.Router();

router.post("/submit", (req, res) => {
  let temp = {
    postId: req.body.postId,
    comment: req.body.comment,
  };
  User.findOne({ uid: req.body.uid })
    .exec()
    .then((userInfo) => {
      temp.author = userInfo._id;
      const newComment = new Comment(temp);
      newComment.save().then(() => {
        Post.findOneAndUpdate(
          {
            _id: req.body.postId,
          },
          { $inc: { commentNum: 1 } }
        ).then(() => {
          return res.status(200).json({ success: true });
        });
      });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.get("/list/:postId", (req, res) => {
  const { postId } = req.params;
  Comment.find({
    postId,
  })
    .sort({ createdAt: -1 })
    .populate("author")
    .exec()
    .then((docs) => {
      return res.status(200).json({ success: true, commentList: docs });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});

router.post("/edit", (req, res) => {
  let temp = {
    postId: req.body.postId,
    comment: req.body.comment,
    uid: req.body.uid,
  };
  Comment.findOneAndUpdate({ _id: req.body.commentId }, { $set: temp })
    .exec()
    .then(() => {
      return res.status(200).json({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false });
    });
});

router.post("/delete", (req, res) => {
  Comment.deleteOne({ _id: req.body.commentId })
    .exec()
    .then(() => {
      Post.findOneAndUpdate(
        // 해당 포스트 내 댓글 개수 줄이기.
        {
          _id: req.body.postId,
        },
        { $inc: { commentNum: -1 } }
      )
        .exec()
        .then(() => {
          return res.status(200).json({ success: true });
        });
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ success: false });
    });
});
export default router;
