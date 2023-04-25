import { NextFunction, Request, Response } from "express";
import HandleError from "../utils/handle-error";

export const Permission =
  (...allowedRoles: string[]) =>
  (_req: Request, res: Response, next: NextFunction) => {
    const user = res.locals.user;
    if (!allowedRoles.includes(user.role)) {
      return next(
        new HandleError("You are not allowed to perform this action", 403)
      );
    }

    next();
  };
