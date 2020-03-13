var express = require('express');
var userRouter = require('./users')
var blogRouter = require('./blogs')

var routers = express.Router()

routers.use(userRouter);
routers.use('/api', blogRouter);

module.exports = routers;