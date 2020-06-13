import User from "../models/User";
import WerewolfProfile from "../models/Werewolf/WerewolfProfile";
var ObjectId = require("mongoose").Types.ObjectId;

export const resolvers = {
  Query: {
    hello: () => "hello",
    users: () => User.find(),
    userData: async (_, { id }) => {
      const user = await User.findById(id);
      const werewolfProfile = await WerewolfProfile.findOne({
        userId: new ObjectId(id),
      });

      return {
        user,
        werewolfProfile,
      };
    },
  },
  Mutation: {
    registerUser: async (_, { username, email, password }) => {
      const user = await User.create({
        email,
        username,
        password,
      });

      // Create token
      const token = user.getSignedJwtToken();

      // Create game profiles
      const werewolfProfile = await WerewolfProfile.create({
        userId: user._id,
      });

      return {
        user,
        token,
        werewolfProfile,
      };
    },
    login: async (_, { username, password }) => {
      // Validate email & password
      if (!username || !password) {
        throw new Error("Please provide a username and password");
      }

      // Check for user
      const user = await User.findOne({ username }).select("+password");

      if (!user) throw new Error("Invalid credentials");

      // Check pass match
      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new Error("Invalid credentials");

      // Create token
      const token = user.getSignedJwtToken();

      return {
        user,
        token,
      };
    },
  },
};
