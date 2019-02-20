import User from "../../../entities/User"; 
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetMyCoupleResponse } from "src/types/graph";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    GetMyCouple: privateResolver(
      async (_, __, { req, pubSub }): Promise<GetMyCoupleResponse> => {
        const user: User = req.user;
        if (user.isMatched && user.coupleId) {
          try {
            const couple = await Couple.findOne({
                where: {id: user.coupleId},
                relations: ["users"]
              }
            );

            if (couple) {
              // pubSub.publish("coupleStatus", {CoupleStatusSubscription: couple});
              return {
                ok: true,
                error: null,
                couple
              };
            } else {
              return {
                ok: false,
                error: "You have no couple",
                couple: null
              }
            }
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
            error: "You have no couple",
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;