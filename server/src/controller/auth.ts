import { Response, Request } from "express"

export const login = (req: Request, res: Response) => {
    res.send("hello login");
}

export const register = (req: Request, res: Response) => {
    res.send("hello register");
}