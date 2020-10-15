const router = require('express').Router();
const TownhallController = require('../controllers/townhallController');

router.get('/', TownhallController.get);

module.exports = router;
