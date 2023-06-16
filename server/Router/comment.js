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
          res.status(200).json({ success: true });
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

export default router;
