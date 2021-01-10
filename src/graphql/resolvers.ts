import {IResolvers} from 'graphql-tools';
const { PubSub } = require("apollo-server");
import CardController from "../Card/CardController";

const cardController = new CardController();
const pubSub = new PubSub();

const CARD_ADDED = 'CARD_ADDED';
const CARD_REMOVED = 'CARD_REMOVED'

const resolvers: IResolvers = {
  Query: {
    cards: async () => await cardController.getAll()
  },
  Mutation: {
    createCard: async (parent, args) => {
      const createdCard = await cardController.saveCard(args);
      await pubSub.publish(CARD_ADDED, {
        cardAdded: createdCard
      });
      return createdCard;
    },
    removeCard: async (parent, args) => {
      const removedCard = await cardController.removeCard(args);

      await pubSub.publish(CARD_REMOVED, {
        cardRemoved: removedCard
      })
      return removedCard
    }
  },
  Subscription: {
    cardAdded: {
      subscribe: () => {
        return pubSub.asyncIterator([CARD_ADDED])
      }
    },
    cardRemoved: {
      subscribe: () => {
        return pubSub.asyncIterator([CARD_REMOVED])
      }
    }
  }
};

export default resolvers;