import dotenv from "dotenv";
dotenv.config()

export default {
    hostRedis: process.env.HOST_REDIS as string,
    accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY as string,
    accessTokenPublicKey: process.env.ACCESS_TOKEN_PUBLIC_KEY as string,
    accessTokenExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string
};
