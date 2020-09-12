const fs = require('fs');
const path = require('path');

const usersDbPath = path.resolve(__dirname, "users.json");

if (fs.existsSync(usersDbPath) === false) {
  fs.writeFileSync(usersDbPath, "[]")
}

class UsersService {
  constructor() {
    const usersData = fs.readFileSync(usersDbPath);
    this.users = JSON.parse(usersData.toString());
    this.id = Date.now();
  }

  dbSync = () => {
    fs.writeFileSync(usersDbPath, JSON.stringify(this.users, null, 2));
  }

  new = (name, password) => {
    const newUser = {
      name: name,
      password: password,
      id: this.id++
    };
    this.users.push(newUser);
    this.dbSync();
    return newUser;
  }

  get = (userId) => {
    for (const user of this.users) {
      if (user.id.toString() === userId.toString()) {
        return user;
      }
    }
    return null;
  }

  getAll = () => {
    return [...this.users];
  };

  update = (id, name, password) => {
    for (const user of this.users) {
      if (user.id === id) {
        user.name = name;
        user.password = password;
      }
    }
    this.dbSync();
  };

  delete = (userId) => {
    const userIndex = this.users
        .findIndex((user) =>
          user.id.toString() === userId.toString()
        );
    if (userIndex === -1) {
      return;
    }
    this.users.splice(userIndex, 1);
    this.dbSync();
  }
}

module.exports = UsersService;
