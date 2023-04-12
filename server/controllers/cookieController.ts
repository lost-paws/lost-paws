import { Request, Response, NextFunction } from "express";

interface CookieController {
  setUserIDCookie: (req: Request, res: Response, next: NextFunction) => void;
}

const cookieController: CookieController = {
  setUserIDCookie: (req: Request, res: Response, next: NextFunction) => {
    try {
      res.cookie('userID', res.locals.newUser, {httpOnly: true, secure: true});
      return next();
    } catch (err) {
      return next({
        log: 'cookieController.setUserIDCookie',
        message: `err: cookieController.setUserIDCookie, ${err}`
      });
    }
  }
}




export default cookieController;
