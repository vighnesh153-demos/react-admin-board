const expressSetup = require('./setup');
const routesLoader = require('./routes');

module.exports = function loaders(app) {

  expressSetup(app);

  routesLoader(app);

}
