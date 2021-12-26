require('dotenv').config();

const express = require('express');
const path = require('path');
const httpProxy = require('http-proxy');
const passport = require('passport');
const session = require('express-session');
const morgan = require('morgan');

const routes = require('./controllers');
const jwt = require('./utils/jwt');
const logger = require('./config/logger');
const app = express();
const proxy = httpProxy.createProxyServer();
const PORT = process.env.PORT || 3001;

require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  morgan(':remote-addr :method :url :status ":user-agent"', {
    stream: {
      write: (message) => logger.info(message.trim()),
    },
    skip: (req, res) => {
      return res.statusCode === 304;
    },
  })
);

app.use(routes);
app.use(express.static(path.join(__dirname, './public')));

app.all('/api/*', function (req, res) {
  // proxy all api requests through microservice
  proxy.web(req, res, { target: process.env.SHIPPING_API });
});

const server = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

server.on('upgrade', (req, socket, head) => {
  // proxy all websocket requests through microservice
  proxy.ws(req, socket, head, { target: process.env.INVENTORY_API });
});

// set authorization header through proxy
proxy.on('proxyReq', (req) => {
  req.setHeader('Authorization', `Bearer ${jwt.sign()}`);
});

proxy.on('proxyReqWs', (req) => {
  req.setHeader('Authorization', `Bearer ${jwt.sign()}`);
});

// capture any errors to prevent app from crashing
proxy.on('error', (err) => {
  logger.error(err.message);
});

// quit via ctrl-c
process.on('SIGINT', () => {
  server.close();
  process.exit(0);
});
