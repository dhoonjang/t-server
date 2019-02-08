import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import Place from "../../../entities/Place";

const resolvers: Resolvers = {
  Query: {
    GetPlaces: privateResolver(
      async (_, __, { req }): Promise<any> => {
        try {
          const places = await Place.find();
          if (places) {
            return {
              ok: true,
              places,
              error: null
            };
          } else {
            return {
              ok: false,
              places: null,
              error: "Places not found"
            };
          }
        } catch (error) {
          return {
            ok: false,
            error: error.message,
            places: null
          };
        }
      }
    )
  }
};
export default resolvers;