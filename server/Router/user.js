import express from "express";
import User from "../Model/User.js";
import Counter from "../Model/Counter.js";
import setUpload from "../Util/upload.js";
const router = express.Router();

router.post("/signUp", (req, res) => {
  console.log(req.body);
  let temp = req.body;
  Counter.findOne({ name: "counter" })
    .exec()
    .then((counter) => {
      temp.userNum = counter.userNum;
      const newUser = new User(temp);
      newUser.save().then(() => {
        Counter.updateOne({ name: "counter" }, { $inc: { userNum: 1 } }).then(
          () => {
            res.status(200).json({ success: true });
          }
        );
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

router.post("/nameCheck", (req, res) => {
  console.log(req.body.displayName);
  User.findOne({ displayName: req.body.displayName })
    .exec()
    .then((doc) => {
      let check = true;
      if (doc) {
        check = false;
      }
      res.status(200).json({ success: true, check });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

router.post("/profile/edit", setUpload("letsmakeit/user"), (req, res) => {
  res.status(200).json({ success: true, filePath: res.req.file.location });
});

router.post("/profile/save", (req, res) => {
  console.log(req.body, "여기");
  let temp = {
    photoURL: req.body.photoURL,
  };
  User.updateOne({ uid: req.body.uid }, { $set: temp })
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

router.post("/bookmark/add", (req, res) => {
  console.log(req.body, "북마크 등록 요청 받기");

  User.updateOne(
    { uid: req.body.uid },
    { $push: { bookmarks: req.body.postId } }
  )
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});

router.post("/bookmark/delete", (req, res) => {
  console.log(req.body, "북마크 삭제 요청 받기");
  User.updateOne(
    { uid: req.body.uid },
    { $pull: { bookmarks: req.body.postId } }
  )
    .exec()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
      console.log(err);
    });
});
export default router;
