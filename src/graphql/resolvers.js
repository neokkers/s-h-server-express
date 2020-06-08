import User from "../models/User";

export const resolvers = {
  Query: {
    hello: () => "hello",
    users: () => User.find()
  },
  Mutation: {
    registerUser: async (_, { name, email, password }) => {
      const user = await User.create({
        name,
        email,
        password
      });

      // Create token
      const token = user.getSignedJwtToken();

      return {
        user,
        token
      };
    },
    login: async (_, { email, password }) => {
      // Validate email & password
      if (!email || !password) {
        throw new Error("Please provide an email and password");
      }

      // Check for user
      const user = await User.findOne({ email }).select("+password");

      if (!user) throw new Error("Invalid credentials");

      // Check pass match
      const isMatch = await user.matchPassword(password);
      if (!isMatch) throw new Error("Invalid credentials");

      // Create token
      const token = user.getSignedJwtToken();

      return {
        user,
        token
      };
    }
  }
};
