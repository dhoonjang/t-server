import User from "../../../entities/User";
import {
  SignUpMutationArgs,
  SignUpResponse
} from "../../../types/graph";
import { Resolvers } from "../../../types/resolvers";
import createJWT from "../../../utils/createJWT";
import Verification from "../../../entities/Verification";
import { sendVerificationEmail } from "../../../utils/sendEmail";
import cleanNullArgs from "../../../utils/cleanNullArgs";

const resolvers: Resolvers = {
  Mutation: {
    SignUp: async (
      _,
      args: SignUpMutationArgs
    ): Promise<SignUpResponse> => {
      const { email } = args;
      try {
        const existingUser = await User.findOne({ email });
        if(email.indexOf("@ajou.ac.kr")<0){
          return {
            ok: false,
            error: "You should use Ajou email",
            token: null
          }
        }
        if (existingUser) {
          return {
            ok: false,
            error: "You should log in instead",
            token: null
          };
        } else {
          const notNull = cleanNullArgs(args);
          const newUser = await User.create({ ...notNull }).save();
          if (newUser.email) {
            const emailVerification = await Verification.create({
              payload: newUser.email
            }).save();
            await sendVerificationEmail(newUser.name, emailVerification.key);
          }
          const token = createJWT(newUser.id);
          return {
            ok: true,
            error: null,
            token
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        };
      }
    }
  }
};

export default resolvers;