const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const port = 5000;
//mongodb+srv://thals8744:aodlfdntdj0@cluster0.96ou6ca.mongodb.net/?retryWrites=true&w=majority
app.use(express.static(path.join(__dirname, "../client/build")));
app.listen(port, () => {
  mongoose
    .connect(
      "mongodb+srv://thals8744:aodlfdntdj0@cluster0.96ou6ca.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log(`Example app listening on port ${port}`);
      console.log("connecting mongodb..");
    })
    .catch((err) => {
      console.log(err);
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
