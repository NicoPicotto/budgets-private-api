import { Request, Response, NextFunction } from "express";
import passport from "../config/passport";
import { IRequest } from "../interfaces/requestInterface";


export const AuthMiddleware = {
   async authenticate(req: IRequest, res: Response, next: NextFunction): Promise<void> {

      passport.authenticate("jwt", (err: Error, currentUser: any, info: any) => {
         if (err) {
            return next(err);
         }


         if (!currentUser) {
            return res.status(401).json({ message: "Unauthorized Access - No Token Provided!" });
         }

         req.currentUser = currentUser.user;
         req.accessToken = req.headers.authorization;

         next();
      })(req, res, next);
   }

};