import { Request, Response } from "express";

const CheckAuth = (req: Request, res: Response) => {
    try{
        // check role
    }catch(e){
        throw new Error(`${e}`);
    }
}

export default CheckAuth;