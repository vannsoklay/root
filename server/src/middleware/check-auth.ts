import { Request, Response, NextFunction } from "express";
import HandleError from '../utils/handle-error';
import redisClient from '../utils/connect-redis';
import { verifyJwt } from '../utils/jwt';
const CheckAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Get the token
        let access_token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            access_token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.access_token) {
            access_token = req.cookies.access_token;
        }

        if (!access_token) {
            return next(new HandleError('You are not logged in', 401));
        }

        // Validate Access Token
        const decoded = verifyJwt<{ sub: string }>(access_token);

        if (!decoded) {
            return next(new HandleError(`Invalid token or user doesn't exist`, 401));
        }

        // Check if user has a valid session
        const session = await redisClient.get(decoded.sub);

        if (!session) {
            return next(new HandleError(`User session has expired`, 401));
        }

        // Check if user still exist
        // const user = await findUserById(JSON.parse(session)._id);
        const user = [{name: "soklay"}];


        if (!user) {
            return next(new HandleError(`User with that token no longer exist`, 401));
        }

        // This is really important (Helps us know if the user is logged in from other controllers)
        // You can do: (req.user or res.locals.user)
        res.locals.user = user;

        next();
    } catch (err: any) {
        next(err);
    }
}

export default CheckAuth;