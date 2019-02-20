import User from "../../../entities/User"; 
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { FindCoupleResponse } from "src/types/graph";
import Couple from "../../../entities/Couple";
import selectPlace from "../../../utils/selectPlace";
import { getRepository } from "typeorm";

const resolvers: Resolvers = {
  Mutation: {
    FindCouple: privateResolver(
      async (_, __, { req, pubSub }): Promise<FindCoupleResponse> => {
        const user: User = req.user;
        if (!user.isMatched) {
          const { gender } = user;
          let opgender = "male"
          if(gender === "male"){
            opgender = "female"
          }
          try {
            const couples = await getRepository(Couple).find({
              relations: ["users"],
              where: {
                status: "REQUESTING"
              },
            });
            
            console.log(couples);
            const couple = couples.find(e => {
              if(e.users[0]){
                return ( e.users[0].gender === opgender )
              }
              return false
            });
            
            if (couple) {
              couple.users.push(user);
              couple.status = "MATCHING";
              const result = await selectPlace();
              if(result){
                couple.place = result;
              }
              couple.save();
              user.isMatched = true;
              user.couple = couple;
              user.coupleId = couple.id;
              user.save();
              // pubSub.publish("coupleStatus", {CoupleStatusSubscription: couple});
              return {
                ok: true,
                error: null,
                user,
                couple
              };
            } else {
              return {
                ok: true,
                error: null,
                couple: null,
                user
              }
            }
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
            error: "You can't have two couple",
            couple: null,
            user
          };
        }
      }
    )
  }
};

export default resolvers;