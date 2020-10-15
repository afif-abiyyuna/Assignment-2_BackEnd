const router = require('express').Router();
const attackController = require('../controllers/attackController');

router.post('/:id', attackController.attack);



module.exports = router;