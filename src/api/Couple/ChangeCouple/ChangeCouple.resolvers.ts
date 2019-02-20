import User from "../../../entities/User";
import Couple from "../../../entities/Couple";
import {
  ChangeCoupleResponse, ChangeCoupleMutationArgs
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";

const resolvers: Resolvers = {
  Mutation: {
    ChangeCouple: privateResolver(
      async (
        _,
        args: ChangeCoupleMutationArgs,
        { req, pubSub }
      ): Promise<ChangeCoupleResponse> => {
        const user: User = req.user;
        const { coupleId } = args;
        try {
          const couple = await Couple.findOne({ id: coupleId }, { relations: ["users"] })

          if (couple) {
            const index = couple.users.findIndex(coupleUser=>coupleUser.id === user.id);

            if(index>=0){
              couple.status = args.status;
              if(couple.status === "CANCELED") {
                couple.users.splice(index, 1);
                user.isMatched = false;
                delete user.coupleId;
                delete user.couple;
                user.save();
              }
              couple.save();
              return {
                ok: true,
                error: null,
                user,
                coupleId
              };
            } else {
              return {
                ok: false,
                error: "You have no auth",
                user,
                coupleId
              };
            }
          } else {
            return {
              ok: false,
              error: "You can't find Couple!",
              user,
              coupleId
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            user,
            coupleId
          };
        }
      }
    )
  }
};

export default resolvers;