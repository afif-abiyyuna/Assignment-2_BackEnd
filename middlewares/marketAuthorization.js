const Market = require('../models/marketModels');

module.exports = (req, res, next) => {
  Market.findOne({ _id: req.params.id })
    .then((market) => {
      if (market) {
        if (market._userId.toString() === req._id) {
          next();
        } else {
          throw ({name:'Forbidden'});
        }
      } else {
        throw ({name:'Not_Found'});
      }
    }).catch(next);
};
