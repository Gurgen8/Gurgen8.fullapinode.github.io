import Users from "../models/Users";
import HttpError from "http-errors";
import md5 from "md5";
import jwt from "jsonwebtoken";

const { JWT_SECRET } = process.env;

class UsersController {

  static login = (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = Users.getUser(email, true);

      const isLogin = user && user.password === md5(md5(password) + '_safe');

      if (!isLogin) {
        throw HttpError(403, 'Invalid email or password')
      }

      const token = jwt.sign({ email }, JWT_SECRET);

      res.json({
        status: 'ok',
        token,
        isLogin
      })
    } catch (e) {
      next(e)
    }
  }

  static register = (req, res, next) => {
    try {

      res.json({
        status: 'ok'
      })
    } catch (e) {
      next(e)
    }
  }

  static profile = (req, res, next) => {
    try {
      const { userEmail } = req;
      const user = Users.getUser(userEmail);
      res.json({
        status: 'ok',
        user
      })
    } catch (e) {
      next(e)
    }
  }


  static usersList = (req, res, next) => {
    try {
      const users = Users.getAllUsers();
      res.json({
        status: 'ok',
        users
      })
    } catch (e) {
      next(e)
    }
  }

}

export default UsersController;
