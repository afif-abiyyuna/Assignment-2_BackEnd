const router = require('express').Router();
const barrackController = require ('../controllers/barrackController');
const barrackAuthorization = require('../middlewares/barrackAuthorization');

router.get('/', barrackController.list);
router.post('/', barrackController.post);
router.get('/:id', barrackAuthorization, barrackController.get);
router.put('/:id', barrackAuthorization,barrackController.put);
router.delete('/:id', barrackAuthorization, barrackController.delete);
router.get('/:id/collect', barrackAuthorization, barrackController.collect);



module.exports = router;