const userRoutes = require('../routes/userRoutes');

module.exports = function routesLoader(app) {
  app.use('/users', userRoutes);
};
