const Farm = require('../models/farmModels');

module.exports = (req, res, next) => {
  Farm.findOne({ _id: req.params.id })
    .then((farm) => {
      if (farm) {
        if (farm._userId.toString() === req._id) {
          next();
        } else {
          throw ({name:'Forbidden'});
        }
      } else {
        throw ({name:'Not_Found'});
      }
    }).catch(next);
};