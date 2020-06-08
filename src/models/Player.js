import mongoose from "mongoose";

export const Player = mongoose.model("Player", { name: String });
