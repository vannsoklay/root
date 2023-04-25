import { Request, Response, NextFunction } from "express";
import HandleError from "../utils/handle-error";

const requireUser = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = res.locals.user;
    if (!user) {
      return next(new HandleError(`Invalid token or session has expired`, 401));
    }

    next();
  } catch (err: any) {
    next(err);
  }
};

export default requireUser;
