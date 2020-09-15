exports.getUsers = function getAllUsers(req, res) {
  const usersService = req.app.get('usersService');
  let users = usersService.getAll();

  // filters
  if (req.query.filter) {
    const filtersObj = JSON.parse(req.query.filter);
    users = usersService.filter(filtersObj, users);
  }

  // sort
  if (req.query.sort) {
    const sortObj = JSON.parse(req.query.sort);
    users = usersService.sort(sortObj, users);
  }

  // pagination
  const total = users.length;
  if (req.query.pagination) {
    const paginationObj = JSON.parse(req.query.pagination);
    users = usersService.pagination(paginationObj, users);
  }

  res.json({ users, total });
};

exports.getUser = function getSingleUser(req, res) {
  const usersService = req.app.get('usersService');
  const user = usersService.get(req.params.id);

  if (user === null) {
    return res.sendStatus(404);
  }
  return res.status(200).json(user);
};

exports.createUsers = function createUsers(req, res) {
  const usersService = req.app.get('usersService');

  const newUsers = [];
  for (const requestUser of req.body) {
    const {name, password} = requestUser;
    const newUser = usersService.new(name, password);
    newUsers.push(newUser);
  }
  res.status(201).send(newUsers);
};

exports.updateUser = function updateUser(req, res) {
  const usersService = req.app.get('usersService');

  const {name, password, id} = req.body;
  usersService.update(id, name, password);
  const updatedUser = usersService.get(id);
  res.status(200).json(updatedUser);
};

exports.deleteUser = function deleteUser(req, res) {
  const usersService = req.app.get('usersService');

  const userId = req.params.id;
  usersService.delete(userId);
  res.status(200).json({ id: userId});
}
