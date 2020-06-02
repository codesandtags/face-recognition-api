// API - Controllers
const version = require('./controllers/version');
const user = require('./controllers/user');
const authentication = require('./controllers/authentication');
const detect = require('./controllers/detect');

module.exports = {
    version,
    user,
    authentication,
    detect,
}