const router = require('express').Router();
const userRoutes = require('./userRoutes');
const townhallRoutes = require('./townhallRoutes');
const marketRoutes = require('./marketRoutes');
const farmRoutes = require('./farmRoutes');
const barrackRoutes = require('./barrackRouter');
const authentication = require('../middlewares/authentication');
const attackRoutes = require('./attackRouter');
const errorHandler = require('../middlewares/errorHandler');

router.use('/users', userRoutes);
router.use(authentication);
router.use(townhallRoutes);
router.use('/markets', marketRoutes);
router.use('/farms', farmRoutes);
router.use('/barracks', barrackRoutes);
router.use('/attacks', attackRoutes);

router.use(errorHandler);

module.exports = router;
