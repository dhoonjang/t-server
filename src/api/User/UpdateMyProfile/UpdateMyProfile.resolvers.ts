import User from "../../../entities/User";
import { UpdateMyProfileMutationArgs, UpdateMyProfileResponse } from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import privateResolver from "../../../utils/privateResolver";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    UpdateMyProfile: privateResolver(
      async (_, args: UpdateMyProfileMutationArgs, { req }): Promise<UpdateMyProfileResponse> => {
        const user: User = req.user;
        const notNull: any = cleanNullArgs(args);
        try{
            if(args.password !== null){
                user.password = args.password;
                user.save();
                delete notNull.password;
            }
            if(args.age !== null){
                user.age = parseInt(args.age, 10);
                user.save();
                delete notNull.age;
            }
            const bug = await User.update({ id: user.id }, { ...notNull });
            console.log(bug);
            return {
                ok: true,
                error: null
            }
        }catch(error){
            return{
                ok: false,
                error: error.message
            }
        }
      }
    )
  }
};

export default resolvers;