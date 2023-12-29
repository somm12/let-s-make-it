import express from "express";
import path from "path";
import mongoose from "mongoose";
import config from "./config/key.js";
import post from "./Router/post.js";
import user from "./Router/user.js";
import comment from "./Router/comment.js";
const __dirname = path.resolve();
const app = express();
const port = process.env.PORT || 5000;
// build 내의 js,css, component들을 static으로 정해줌.
app.use(express.static(path.join(__dirname, "../client/build")));
// body-parser (client에서 보내는 body data를 받기 위해서 파싱하는 과정)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// body-parser
app.use("/api/post", post);
app.use("/api/user", user);
app.use("/api/comment", comment);

app.listen(port, () => {
  mongoose
    .connect(config.mongoURI)
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("connecting mongodb..");
    })
    .catch((err) => {
      console.log(`${err}`);
    });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
// client에서 react-router-dom으로 라우팅 규칙을 정의했기 때문에,
// 서버에서는 사용자가 어떠한 get요청을 보내든
// 항상 index.html을 띄워줘야함. -> index.html에는 root div가 있고 여기서 리액트 SPA가 보여짐.
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});
