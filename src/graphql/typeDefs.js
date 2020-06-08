import { gql } from "apollo-server-express";

export const typeDefs = gql`
  type Query {
    hello: String!
    users: [User!]!
  }
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    password: String!
    resetPasswordToken: String!
    resetPasswordExpire: String!
    createdAt: String!
    elo: Int!
    won: Int!
    lost: Int!
    mainVillain: Int!
  }
  type RegisterResponse {
    user: User!
    token: String!
  }
  type Mutation {
    registerUser(
      name: String!
      email: String!
      password: String!
    ): RegisterResponse!
    login(email: String!, password: String!): RegisterResponse!
  }
`;
