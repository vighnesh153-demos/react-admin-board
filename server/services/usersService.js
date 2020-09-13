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

  filter = (filters, users) => {
    if (filters.ids && filters.ids.length > 0) {
      users = users.filter(user => filters.ids.includes(user.id));
    }
    if (filters.query) {
      const query = filters.query.toString().toLowerCase();
      users = users.filter(user => {
        return user.id.toString().toLowerCase().includes(query) ||
          user.name.toLowerCase().includes(query);
      });
    }
    return users;
  }

  sort = (sort, users) => {
    if (sort.order === 'ASC') {
      users.sort((user1, user2) => {
        return user1[sort.field] <= user2[sort.field] ? -1 : 1;
      });
    } else {
      users.sort((user1, user2) => {
        return user1[sort.field] >= user2[sort.field] ? -1 : 1;
      });
    }
    return users;
  }

  pagination = (pagination, users) => {
    const startFrom = (pagination.page - 1) * pagination.perPage;
    const endAt = startFrom + pagination.perPage
    return users.slice(startFrom, endAt);
  }
}

module.exports = UsersService;
