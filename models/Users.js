import path from "path";
import fs from "fs";


class Users {

  static createUser = (email, data = {}) => {
    const filePath = path.join(__dirname, '../data/users', email + '.json');
    fs.writeFileSync(filePath, JSON.stringify({ email, ...data }, null, 2));
  }

  static getUser = (email, includePass = false) => {
    const filePath = path.join(__dirname, '../data/users', email + '.json');
    if (!fs.existsSync(filePath)) {
      return null
    }
    const user = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    if (!includePass) {
      delete user.password;
    }
    return user;
  }

  static getAllUsers = () => {
    const data = fs.readdirSync(path.join(__dirname, '../data/users'));

    const users = data.map(d => this.getUser(d.replace(/\.json$/, '')));
    return users;
  }

}

export default Users;
