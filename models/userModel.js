const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  name : {type: String, required: true, maxlength:10 },
  email: { type: String, required: true },
  password: { type: String, required: true, minlength: 5 },
  medals: { type: Number, default: 0 },
  resources: {
    golds: { type: Number, default: 100 },
    foods: { type: Number, default: 100 },
    soldiers: { type: Number, default: 0 },
  },
});

userSchema.pre('save', function (next) {
  User.findOne({ email: this.email })
    .then((user) => {
      if (user) {
        next({name:'Email_Already_Exist'});
      } else {
        this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(10));
        next();
      }
    })
    .catch((e) => next({name:'Mongoose_Error'}));
});

const User = mongoose.model('User', userSchema);

module.exports = User;
