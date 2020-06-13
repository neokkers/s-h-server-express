import mongoose from "mongoose";
// import WerewolfProfileSchema from "./WerewolfProfile";
// import UserSchema from "../User";
const WerewolfGameSchema = new mongoose.Schema({
  wolves: [{ type: ObjectId, ref: "User" }],
  villagers: [{ type: ObjectId, ref: "User" }],
  wolvesWon: {
    type: Boolean,
    required: [true, "Please add a wolvesWon"],
  },
});

module.exports = mongoose.model("WerewolfGame", WerewolfGameSchema);
