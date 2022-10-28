import { Request, Response } from "express";

const CheckRole = (req: Request, res: Response, next?: (err?: any) => any): any => {
    try{
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).send({ status: 403, message: 'Unauthorized!' });
        }
    
        const token = authHeader.split(' ')[1];

        print(token)
    
        // jwt.verify(token, authConfig.providers.jwt.secret, (err: any, user: any) => {
        //   if (err) {
        //     return res.status(403).send({ status: 403, message: 'Forbidden!' });
        //   }
    
        //   req.loggedUser = user;
        //   next();
        // });
    }catch(e){
        throw new Error(`${e}`);
    }
}

export default CheckRole;