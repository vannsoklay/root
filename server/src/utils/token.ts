import config from '../config/custom-env';
import { signJwt } from './jwt';
import redisClient from './connect-redis';

export const signToken = async (user: any) => {
  
  // Sign the access token
  const access_token = signJwt(
    { sub: user._id },
    {
      expiresIn: "1d",
    }
  );
  
  let id = user._id.toString()
  
  // Create a Session
  redisClient.set(id, JSON.stringify(user), {
    EX: 60 * 60,
  });

  // Return access token
  return { access_token };
};
