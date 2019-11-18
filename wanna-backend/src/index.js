Promise = require('bluebird'); // eslint-disable-line no-global-assign
const { port, env } = require('./config/vars');
const app = require('./config/express');
const socket = require('./socket.js')

const server = app.listen(port, () => console.info(`Server started on port ${port} (${env})`));

const io = require('socket.io')(server);

socket.socketHandler(io);

app.locals.io = io;
/**
 * Exports express
 * @public
 */
module.exports = app;
module.exports = io;