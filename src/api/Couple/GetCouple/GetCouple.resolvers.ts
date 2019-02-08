import { getRepository } from "typeorm";
import User from "../../../entities/User"; 
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import { GetCoupleResponse } from "src/types/graph";
import Couple from "../../../entities/Couple";

const resolvers: Resolvers = {
  Query: {
    GetCouple: privateResolver(
      async (_, __, { req }): Promise<GetCoupleResponse> => {
        const user: User = req.user;
        if (!user.isMatched) {
          const { gender } = user;
          let opgender = "male"
          if(gender === "male"){
            opgender = "female"
          }
          try {
            const couples = await getRepository(Couple).find({
                where: {status: "REQUESTING"},
                relations: ["users"]
              }
            );
            
            const couple = couples.find(e => {
              return e.users[0].gender === opgender
            });

            if (couple) {
              return {
                ok: true,
                error: null,
                couple
              };
            } else {
              return {
                ok: true,
                error: null,
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
            error: "You are not a driver",
            couple: null
          };
        }
      }
    )
  }
};

export default resolvers;