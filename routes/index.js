const Router = require('express').Router;
const apiRoutes = require('./posts/apiRoutes');
const htmlRoutes = require('./htmlRoutes');

const router = new Router();

router.use('/api', apiRoutes);
router.use('', htmlRoutes);

module.exports = router;
