import {IResolvers} from 'graphql-tools';
const { PubSub } = require("apollo-server");
import CardController from "../Card/CardController";

const cardController = new CardController();
const pubSub = new PubSub();

const SUBSCRIPTION_ACTIONS = {
  CARD_ADDED: 'CARD_ADDED',
  CARD_REMOVED: 'CARD_REMOVED'
};

const resolvers: IResolvers = {
  Query: {
    cards: async () => await cardController.getAll()
  },
  Mutation: {
    createCard: async (parent, args) => {
      await pubSub.publish(SUBSCRIPTION_ACTIONS.CARD_ADDED, {
        cardAdded: {...args}
      })
      await cardController.saveCard(args)
    },
    removeCard: async (parent, args) => {
      await pubSub.publish(SUBSCRIPTION_ACTIONS.CARD_REMOVED, {
        cardRemoved: {...args}
      })
      await cardController.removeCard(args)
    }
  },
  Subscription: {
    cardAdded: {
      subscribe: () => {
        return pubSub.asyncIterator([SUBSCRIPTION_ACTIONS.CARD_ADDED])
      }
    },
    cardRemoved: {
      subscribe: () => {
        return pubSub.asyncIterator([SUBSCRIPTION_ACTIONS.CARD_REMOVED])
      }
    }
  }
};

export default resolvers;