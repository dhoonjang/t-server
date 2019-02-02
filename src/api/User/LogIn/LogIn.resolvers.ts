import { SignInMutationArgs, SignInResponse } from "src/types/graph";
import { Resolvers } from "src/types/resolvers";
import User from "../../../entities/User";
import createJWT from "../../../utils/createJWT";

const resolvers: Resolvers = {
  Mutation: {
    SignIn: async (
      _,
      args: SignInMutationArgs
    ): Promise<SignInResponse> => {
      const { email, password } = args;
      console.log(email);
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return {
            ok: false,
            error: "No User found with that email",
            token: null
          }
        }
        console.log(password);
        const checkPassword = await user.comparePassword(password)
        if (checkPassword) {
          const token = createJWT(user.id);
          return {
            ok: true,
            error: null,
            token
          }
        } else {
          return {
            ok: false,
            error: "Wrong Password",
            token: null
          }
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null
        }
      }
    }
  }
}

export default resolvers;