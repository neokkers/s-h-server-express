import { players } from "./config/mock";

const dotenv = require("dotenv");
const colors = require("colors");
const mongoose = require("mongoose");

dotenv.config({ path: "./config/config.env" });

const User = require("./src/models/User");
const WerewolfProfile = require("./src/models/Werewolf/WerewolfProfile");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const deleteUsers = async () => {
  try {
    await User.deleteMany();

    console.log("Users destroyed...".red.inverse);
  } catch (error) {
    console.log(error);
  }
};
const createUsers = async () => {
  try {
    await User.insertMany(players);

    console.log("Users added...".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteWerewolfProfiles = async () => {
  try {
    await WerewolfProfile.deleteMany();

    console.log("WerewolfProfile destroyed...".red.inverse);
  } catch (error) {
    console.log(error);
  }
};
const deleteAll = async () => {
  try {
    await deleteUsers();
    await deleteWerewolfProfiles;

    console.log("WerewolfProfile destroyed...".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === "-da") {
  deleteAll();
}
if (process.argv[2] === "-cu") {
  createUsers();
}
