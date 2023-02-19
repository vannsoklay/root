import { verifyJwt } from "../utils/jwt";
import { GraphQLError } from "graphql";

export const verifyUser = async (token: any) => {
  try {
    // Get the token
    let access_token;
    if (token && token.startsWith("Bearer")) {
      access_token = token.split(" ")[1];
    }
    if (!access_token) {
      throw new GraphQLError("You are not authorized to perform this action.");
    }
    const decoded = verifyJwt<{ sub: string }>(access_token);

    if (!decoded) {
      throw new GraphQLError("You are not authorized to perform this action.");
    }
    return {
      user: {
        id: decoded.sub,
      },
    };
  } catch (err: any) {
    return err;
  }
};
