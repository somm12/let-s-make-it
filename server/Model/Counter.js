import mongoose from "mongoose";
const counterSchema = new mongoose.Schema(
  {
    name: String,
    postNum: Number,
    userNum: Number,
  },
  { collection: "counter" }
);
const Counter = mongoose.model("Counter", counterSchema);
export default Counter;
