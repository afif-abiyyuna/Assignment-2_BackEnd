const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserController {
  static register(req, res, next) {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password });
    user.save().then((user) => {
        res.status(201).json({ success: true, data: user });
      }).catch(next);
  }

  static login(req, res, next) {
    const { email, password } = req.body;
    User.findOne({ email }).then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const access_token = jwt.sign({ _id: user._id }, 'GAMES_COV');
          res.status(200).json({ success: true, access_token });
        } else {
          throw ({name:'Login_Failed'});
        }
      }).catch(next);
  }
}

module.exports = UserController;
