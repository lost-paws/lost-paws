import { Request, Response, NextFunction } from "express";

interface CookieController {
  setUserIDCookie: (req: Request, res: Response, next: NextFunction) => void;
}

const cookieController: CookieController = {
  setUserIDCookie: (req: Request, res: Response, next: NextFunction) => {
    //const { id } = res.locals.newUser.oid
    try {
      res.cookie('userID', res.locals.newUser.rows, {httpOnly: true, secure: true});
      //console.log('userID from', req.params.id)
      console.log('new res.locals.newUser ------ >', res.locals.newUser);
      console.log('rows object using res.locals.newUser.rows ------- >', res.locals.newUser.rows)
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
