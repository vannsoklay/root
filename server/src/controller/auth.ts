import { Response, Request, NextFunction, CookieOptions } from "express"
import { User, CreateUserInput, LoginUserInput, hashedPassword, comparePasswords } from "../models/user";
import HandleError from "../utils/handle-error";
import { signToken } from "../utils/token";
import config from '../config/custom-env';

const accessTokenCookieOptions: CookieOptions = {
    expires: new Date(
        Date.now() + parseInt(config.accessTokenExpiresIn) * 60 * 1000
    ),
    maxAge: parseInt(config.accessTokenExpiresIn) * 60 * 1000,
    httpOnly: true,
    sameSite: 'lax',
};

export const register = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
    let args = req.body;
    let email = await User.find({ email: req.body.email });
    let password = await hashedPassword(args.password);
    try {
        const user = await new User({
            ...args,
            password: password
        });

        if (email.length > 0) {
            throw ({ "code": 11000 });
        }
        await user.save()

        res.status(201).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err: any) {
        if (err.code === 11000) {
            return res.status(409).json({
                status: 'fail',
                message: 'Email already exist',
            });
        }
        next(err);
    }
}

export const login = async (req: Request<{}, {}, LoginUserInput>, res: Response, next: NextFunction) => {
    let args = req.body;
    try {
        // Get the user from the collection
        const user: any = await User.findOne({ email: args.email }).select('+password');
        
        // Check if user exist and password is correct
        if (
            !user ||
            !(await comparePasswords(user.password, req.body.password))
        ) {
            return next(new HandleError('Invalid email or password', 401));
        }

        // Create an Access Token
        const { access_token } = await signToken(user);
        
        // Send Access Token in Cookie
        res.cookie('accessToken', access_token, accessTokenCookieOptions);
        res.cookie('logged_in', true, {
            ...accessTokenCookieOptions,
            httpOnly: false,
        });

        // Send Access Token
        res.status(200).json({
            status: 'success',
            access_token,
        });
    } catch (err: any) {
        next(err);
    }
}