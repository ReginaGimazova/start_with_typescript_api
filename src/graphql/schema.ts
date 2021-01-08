import { GraphQLSchema } from "graphql";
const { gql } = require('apollo-server-express');
import {makeExecutableSchema} from "graphql-tools";
import resolvers from "./resolvers";

const typeDefs = gql`
  type Query {
      cards: [Card!]
  }
  type Mutation {
      createCard(text: String!): Card
      removeCard(id: ID!): Card
  }
  type Subscription {
      cardAdded: Card
      cardRemoved: Card
  }
  type Card {
      id: ID!
      text: String!
  }
`;

const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;