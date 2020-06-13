import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
    userData(id: ID!): UserDataQueryRes!
  }
  type UserDataQueryRes {
    user: User!
    werewolfProfile: WerewolfProfile!
  }
  type User {
    id: ID!
    name: String!
    username: String!
    email: String!
    role: String!
    password: String!
    resetPasswordToken: String!
    resetPasswordExpire: String!
    createdAt: String!
  }
  type WerewolfProfile {
    userId: ID!
    elo: Int!
    won: Int!
    lost: Int!
  }
  type RegisterResponse {
    user: User!
    token: String!
    werewolfProfile: WerewolfProfile!
  }
  type Mutation {
    registerUser(
      username: String!
      email: String!
      password: String!
    ): RegisterResponse!
    login(email: String!, password: String!): RegisterResponse!
  }
`;
