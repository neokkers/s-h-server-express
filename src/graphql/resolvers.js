import { Player } from "../models/Player";

export const resolvers = {
  Query: {
    hello: () => "hello",
    players: () => Player.find()
  },
  Mutation: {
    createPlayer: async (_, { name }) => {
      const player = new Player({ name });
      await player.save();
      console.log(player);
      return player;
    }
  }
};
