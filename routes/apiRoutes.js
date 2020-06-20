const Router = require('express').Router;
const postRoutes = require('./posts');

const apiRoutes = Router();

apiRoutes.use('/posts', postRoutes);

module.exports = apiRoutes;
