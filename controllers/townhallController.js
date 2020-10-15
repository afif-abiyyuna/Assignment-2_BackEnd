const User = require('../models/userModel');

class TownhallController {
  static get(req, res, next) {
    User.findById(req._id).then((user) => {
        if (user) {
          res.status(200).json({ success: true, data: user.resources });
        } else {
          throw ({name:'User_Not_Found'});
        }
      }).catch(next);
  }
}

module.exports = TownhallController;
