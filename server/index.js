const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded());
app.use(express.json());


const UsersService = require("./usersService");
const users = new UsersService();

// Get all users
app.get('/users', (req, res) => {
  res.json(users.getAll());
});

// Get single user
app.get('/users/:id', (req, res) => {
  const user = users.get(req.params.id);
  if (user === null) {
    return res.sendStatus(404);
  }
  return res.status(200).json(user);
});

// Create an user (using id param to differentiate
// from create_multiple_users middleware)
app.post('/users/:id', (req, res) => {
  const {name, password} = req.body;
  const newUser = users.new(name, password);
  res.status(201).json(newUser);
});

// Create multiple users
app.post('/users', (req, res) => {
  const newUsers = []
  for (const requestUser of req.body) {
    const {name, password} = requestUser;
    const newUser = users.new(name, password);
    newUsers.push(newUser);
  }
  res.status(201).send(newUsers);
});

// Update single user
app.put('/users/:id', (req, res) => {
  const {name, password, id} = req.body;
  users.update(id, name, password);
  const updatedUser = users.get(id);
  res.status(200).json(updatedUser);
});

app.delete('/users/:id', (req, res) => {
  const userId = req.params.id;
  users.delete(userId);
  res.status(200).json({ id: userId});
});

app.listen(4242, () => {
  console.log(`
  ************************************
  * Server is listening on port 4242 *
  ************************************
  `);
});
