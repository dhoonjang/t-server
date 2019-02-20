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
                user.isMatched = true;
                user.couple = couple;
                user.coupleId = couple.id;
                user.save();
                return {
                    ok: true,
                    error: null,
                    couple,
                    user
                };
            } catch (error) {
                return {
                    ok: false,
                    error: error.message,
                    couple: null,
                    user
                };
            }
        } else {
            return {
                ok: false,
                error: "You can't request two couples",
                couple: null,
                user
            };
        }
      }
    )
  }
};

export default resolvers;