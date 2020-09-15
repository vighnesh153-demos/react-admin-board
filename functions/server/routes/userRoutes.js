const userRoutes = require('express').Router();
const usersControllers = require('../controllers/users');

userRoutes.get('', usersControllers.getUsers);
userRoutes.get('/:id', usersControllers.getUser);
userRoutes.post('', usersControllers.createUsers);
userRoutes.put('/:id', usersControllers.updateUser);
userRoutes.delete('/:id', usersControllers.deleteUser);

module.exports = userRoutes;
