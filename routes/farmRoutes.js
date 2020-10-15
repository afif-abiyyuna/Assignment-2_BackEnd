const router = require ('express').Router();
const farmController = require('../controllers/farmController');
const farmAuthorization = require('../middlewares/farmAuthorization');

router.get('/', farmController.list);
router.post('/', farmController.post);
router.get('/:id', farmAuthorization, farmController.get);
router.put('/:id', farmAuthorization, farmController.put);
router.delete('/:id', farmAuthorization, farmController.delete);
router.get('/:id/collect', farmAuthorization, farmController.collect);



module.exports = router;