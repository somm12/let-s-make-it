import express from "express";
import User from "../Model/User.js";
import Counter from "../Model/Counter.js";
import setUpload from "../Util/upload.js";
const router = express.Router();

router.post("/signUp", (req, res) => {
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
  let temp = {
    photoURL: req.body.photoURL,
    displayName: req.body.displayName,
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
  User.updateOne(
    { uid: req.body.uid },
    { $push: { bookmark: req.body.postId } }
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
  User.updateOne(
    { uid: req.body.uid },
    { $pull: { bookmark: req.body.postId } }
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
