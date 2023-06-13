import express from "express";
import User from "../Model/User.js";
import Counter from "../Model/Counter.js";
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
export default router;
