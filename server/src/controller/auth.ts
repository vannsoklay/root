import { Response, Request, NextFunction } from "express"
import { User, CreateUserInput } from "../models/user";
export const register = async (req: Request<{}, {}, CreateUserInput>, res: Response, next: NextFunction) => {
    let args = req.body;
    try {
        const user = await new User({
          ...args
        }).save();
    
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

export const login = (req: Request, res: Response) => {
    res.send("hello register");
}