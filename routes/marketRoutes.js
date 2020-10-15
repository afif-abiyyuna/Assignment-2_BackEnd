const router = require('express').Router();
const MarketController = require('../controllers/marketController');
const marketAuthorization = require('../middlewares/marketAuthorization');

router.get('/', MarketController.list);
router.post('/', MarketController.post);
router.get('/:id', marketAuthorization, MarketController.get);
router.put('/:id', marketAuthorization, MarketController.put);
router.delete('/:id', marketAuthorization, MarketController.delete);
router.get('/:id/collect', marketAuthorization, MarketController.collect);

module.exports = router;
