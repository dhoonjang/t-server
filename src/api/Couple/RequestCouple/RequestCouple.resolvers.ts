import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import {
    RequestCoupleResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    RequestCouple: privateResolver(
      async (
        _,
        __,
        { req, pubSub }
      ): Promise<RequestCoupleResponse> => {
        const user: User = req.user;
        if (!user.isMatched) {
            try {
                const couple = await Couple.create({ users: [user] }).save();
                /* pubSub.publish("coupleRequest", {NearbyRideSubscription: ride}); */
                user.isMatched = true;
                user.couple = couple;
                user.save();
                return {
                    ok: true,
                    error: null,
                    couple
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    couple: null
                };
            }
        } else {
            return {
                ok: false,
                error: "You can't request two couples",
                couple: null
            };
        }
      }
    )
  }
};

export default resolvers;