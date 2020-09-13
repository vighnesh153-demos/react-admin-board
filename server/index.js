const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());


const UsersService = require("./usersService");
const usersService = new UsersService();

// Get all users
app.get('/users', (req, res) => {
  let users = usersService.getAll();

  // filters
  if (req.query.filter) {
    const filters = JSON.parse(req.query.filter);
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
  }

  // sort
  if (req.query.sort) {
    const sort = JSON.parse(req.query.sort);
    if (sort.order === 'ASC') {
      users.sort((user1, user2) => {
        return user1[sort.field] <= user2[sort.field] ? -1 : 1;
      });
    } else {
      users.sort((user1, user2) => {
        return user1[sort.field] >= user2[sort.field] ? -1 : 1;
      });
    }
  }

  // pagination
  const total = users.length;
  if (req.query.pagination) {
    const pagination = JSON.parse(req.query.pagination);
    const startFrom = (pagination.page - 1) * pagination.perPage;
    const endAt = startFrom + pagination.perPage
    users = users.slice(startFrom, endAt);
  }

  res.json({
    users,
    total
  });
});

// Get single user
app.get('/users/:id', (req, res) => {
  const user = usersService.get(req.params.id);
  if (user === null) {
    return res.sendStatus(404);
  }
  return res.status(200).json(user);
});

// Create an user (using id param to differentiate
// from create_multiple_users middleware)
app.post('/users/:id', (req, res) => {
  const {name, password} = req.body;
  const newUser = usersService.new(name, password);
  res.status(201).json(newUser);
});

// Create multiple users
app.post('/users', (req, res) => {
  const newUsers = [];
  for (const requestUser of req.body) {
    const {name, password} = requestUser;
    const newUser = usersService.new(name, password);
    console.log(newUser)
    newUsers.push(newUser);
  }
  res.status(201).send(newUsers);
});

// Update single user
app.put('/users/:id', (req, res) => {
  const {name, password, id} = req.body;
  usersService.update(id, name, password);
  const updatedUser = usersService.get(id);
  res.status(200).json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  usersService.delete(userId);
  res.status(200).json({ id: userId});
});

app.listen(4242, () => {
  console.log(`
  ************************************
  * Server is listening on port 4242 *
  ************************************
  `);
});
