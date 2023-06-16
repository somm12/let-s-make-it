import express from "express";
import Post from "../Model/Post.js";
import User from "../Model/User.js";
import Comment from "../Model/Comment.js";
const router = express.Router();

router.post("/submit", (req, res) => {
  console.log(req.body);
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

router.post("/list", (req, res) => {
  console.log(req.body);
  Comment.find({
    postId: req.body.postId,
  })
    .populate("author")
    .exec()
    .then((docs) => {
      console.log(docs);
      return res.status(200).json({ success: true, commentList: docs });
    })
    .catch((err) => {
      return res.status(400).json({ success: false });
    });
});
export default router;
