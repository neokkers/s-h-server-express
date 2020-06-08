import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    players: [Player!]!
  }
  type Player {
    id: ID!
    name: String!
  }
  type Mutation {
    createPlayer(name: String!): Player!
  }
`;
