import express from 'express';
import {createServer} from "http";
import {ApolloServer} from "apollo-server-express";
import schema from "./graphql/schema";

const app = express();

const server = new ApolloServer({
  schema,
  playground: true,
  subscriptions: {
    onConnect: async (connectionParams, webSocket) => {
      console.log(connectionParams, 'connection params');
    },
  },
});

server.applyMiddleware({app, path: '/graphql'});

const httpServer = createServer(app);
server.installSubscriptionHandlers(httpServer)

httpServer.listen({port: 5000}, () => {
  console.log('Apollo Server on /graphql')
})
