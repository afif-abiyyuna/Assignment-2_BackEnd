const Barrack = require('../models/barrackModel');

module.exports = (req, res, next) => {
  Barrack.findOne({ _id: req.params.id })
    .then((barrack) => {
      if (barrack) {
        if (barrack._userId.toString() === req._id) {
          next();
        } else {
          throw ({name:'Forbidden'});
        }
      } else {
        throw ({name:'Not_Found'});
      }
    }).catch(next);
};