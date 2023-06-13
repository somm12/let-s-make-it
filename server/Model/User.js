import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    userNum: Number,
    email: String,
    displayName: String,
    uid: String,
    returnSecureToken: Boolean,
  },
  { collection: "users" }
);
const User = mongoose.model("User", userSchema);
export default User;
