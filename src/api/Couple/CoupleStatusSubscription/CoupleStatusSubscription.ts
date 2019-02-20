import { withFilter } from "graphql-yoga";
import User from "../../../entities/User";

const resolvers = {
  Subscription: {
    CoupleStatusSubscription: {
      subscribe: withFilter(
        (_, __, { pubSub }) => pubSub.asyncIterator("coupleStatus"),
        (payload, _, { context }) => {
          const user: User = context.currentUser;
          const {
            CoupleStatusSubscription: { users }
          } = payload;
          return users.indexOf(user) > -1;
        }
      )
    }
  }
};

export default resolvers;